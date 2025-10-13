package handlers

import (
	"context"
	"time"

	"github.com/enesbuyuk/commbuildersite/internal/config"
	"github.com/enesbuyuk/commbuildersite/internal/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetContacts(c *fiber.Ctx) error {
	var contacts []models.ContactModel

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := config.DB.Collection("contact").Find(ctx, bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to retrieve contacts",
		})
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &contacts); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to parse contacts",
		})
	}

	return c.JSON(contacts)
}

func GetContact(c *fiber.Ctx) error {
	key := c.Params("key")
	var contact models.ContactModel

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := config.DB.Collection("contact").FindOne(ctx, bson.M{"key": key}).Decode(&contact); err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Contact not found",
		})
	}

	return c.JSON(contact)
}

// PostContact creates a new contact entry in the database.
func PostContact(c *fiber.Ctx) error {
	contact := new(models.ContactModel)
	if err := c.BodyParser(contact); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Check if contact with this key already exists
	var existing models.ContactModel
	err := config.DB.Collection("contact").FindOne(ctx, bson.M{"key": contact.Key}).Decode(&existing)
	if err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "Contact with this key already exists",
		})
	}

	result, err := config.DB.Collection("contact").InsertOne(ctx, contact)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to create contact",
		})
	}

	contact.ID = result.InsertedID.(primitive.ObjectID).Hex()
	return c.Status(fiber.StatusCreated).JSON(contact)
}

// PutContact updates an existing contact entry in the database by key.
func PutContact(c *fiber.Ctx) error {
	key := c.Params("key")
	contact := new(models.ContactModel)

	if err := c.BodyParser(contact); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	update := bson.M{
		"$set": bson.M{
			"name":  contact.Name,
			"value": contact.Value,
		},
	}

	result, err := config.DB.Collection("contact").UpdateOne(ctx, bson.M{"key": key}, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update contact",
		})
	}

	if result.MatchedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Contact not found",
		})
	}

	contact.Key = key
	return c.JSON(contact)
}

// DeleteContact removes a contact entry from the database by key.
func DeleteContact(c *fiber.Ctx) error {
	key := c.Params("key")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := config.DB.Collection("contact").DeleteOne(ctx, bson.M{"key": key})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to delete contact",
		})
	}

	if result.DeletedCount == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Contact not found",
		})
	}

	return c.SendStatus(fiber.StatusNoContent)
}
