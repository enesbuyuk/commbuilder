package handlers

import (
	"context"

	"github.com/enesbuyuk/commbuildersite/internal/config"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetLanguages(c *fiber.Ctx) error {
	var languages []bson.M

	cursor, err := config.DB.Collection("languages").Find(context.Background(), bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to retrieve languages"})
	}
	defer cursor.Close(context.Background())

	if err := cursor.All(context.Background(), &languages); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to decode languages"})
	}

	return c.JSON(languages)
}

func GetLanguageByCode(c *fiber.Ctx) error {
	code := c.Params("code")
	var language bson.M

	err := config.DB.Collection("languages").FindOne(context.Background(), bson.M{"language": code}).Decode(&language)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Language not found"})
	}

	return c.JSON(language)
}