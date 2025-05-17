package handlers

import (
	"context"
	"github.com/enesbuyuk/university-student-club-website/internal/config"
	"github.com/enesbuyuk/university-student-club-website/internal/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	"strconv"
	"time"
)

func GetUsefulLinks(c *fiber.Ctx) error {
	var links []models.UsefulLinkModel
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	limit, err := strconv.Atoi(c.Query("limit", "100"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid limit value"})
	}
	if limit > 200 {
		return c.Status(400).JSON(fiber.Map{"error": "Limit value is too high"})
	}

	cursor, err := config.DB.Collection("useful_links").Find(ctx, bson.M{}, options.Find().SetSort(bson.M{"date": -1}).SetLimit(int64(limit)))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be retrieved"})
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &links); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be processed"})
	}

	return c.JSON(links)
}

func PostUsefulLinks(c *fiber.Ctx) error {
	link := new(models.UsefulLinkModel)
	if err := c.BodyParser(link); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := config.DB.Collection("useful_links").InsertOne(ctx, link)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be inserted"})
	}

	return c.JSON(link)
}

func PutUsefulLinks(c *fiber.Ctx) error {
	id := c.Params("id")
	updateData := new(models.UsefulLinkModel)

	if err := c.BodyParser(updateData); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	filter := bson.M{"_id": objID}
	update := bson.M{"$set": updateData}

	result, err := config.DB.Collection("useful_links").UpdateOne(ctx, filter, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not update useful link"})
	}
	if result.MatchedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Useful link not found"})
	}

	return c.JSON(fiber.Map{"message": "Useful link updated successfully"})
}

func DeleteUsefulLinks(c *fiber.Ctx) error {
	id := c.Params("id")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid ID format"})
	}

	filter := bson.M{"_id": objID}
	result, err := config.DB.Collection("useful_links").DeleteOne(ctx, filter)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not delete useful link"})
	}
	if result.DeletedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Useful link not found"})
	}

	return c.JSON(fiber.Map{"message": "Useful link deleted successfully"})
}
