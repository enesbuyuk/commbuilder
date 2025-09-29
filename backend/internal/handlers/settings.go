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

func GetSettings(c *fiber.Ctx) error {
	var settings []models.SettingModel
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := config.DB.Collection("settings").Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be retrieved"})
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &settings); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be processed"})
	}

	return c.JSON(settings)
}

func GetSetting(c *fiber.Ctx) error {
	key := c.Params("key")
	var setting models.SettingModel

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := config.DB.Collection("settings").FindOne(ctx, bson.M{"key": key}).Decode(&setting); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Setting not found"})
	}

	return c.JSON(setting)
}

func PostSettings(c *fiber.Ctx) error {
	setting := new(models.SettingModel)
	if err := c.BodyParser(setting); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := config.DB.Collection("settings").InsertOne(ctx, setting)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be inserted"})
	}

	return c.JSON(setting)
}

func PutSettings(c *fiber.Ctx) error {
	id := c.Params("id")
	updateData := new(models.SettingModel)

	if err := c.BodyParser(updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID"})
	}

	update := bson.M{
		"$set": updateData,
	}

	result, err := config.DB.Collection("settings").UpdateOne(ctx, bson.M{"_id": objID}, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be updated"})
	}
	if result.MatchedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Setting not found"})
	}

	return c.JSON(fiber.Map{"message": "Setting updated successfully"})
}
