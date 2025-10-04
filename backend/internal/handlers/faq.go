package handlers

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/enesbuyuk/commbuildersite/internal/config"
	"github.com/enesbuyuk/commbuildersite/internal/models"
)

// GetFaq retrieves FAQ entries from the database.
func GetFaq(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	findOptions := options.Find()

	cursor, err := config.DB.Collection("faq").Find(ctx, bson.M{}, findOptions)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not fetch FAQ entries"})
	}
	defer cursor.Close(ctx)

	var faqs []models.FaqModel
	if err := cursor.All(ctx, &faqs); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not decode FAQ entries"})
	}

	return c.JSON(faqs)
}
