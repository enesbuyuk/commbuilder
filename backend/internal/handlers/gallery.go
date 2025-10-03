package handlers

import (
	"context"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/enesbuyuk/commbuildersite/internal/config"
	"github.com/enesbuyuk/commbuildersite/internal/models"
)

func GetGallery(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	limitParam := c.Query("limit")
	limit := int64(0)
	if limitParam != "" {
		parsedLimit, err := strconv.ParseInt(limitParam, 10, 64)
		if err != nil || parsedLimit < 1 {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid limit parameter"})
		}
		limit = parsedLimit
	}

	findOptions := options.Find()
	if limit > 0 {
		findOptions.SetLimit(limit)
	}
	findOptions.SetSort(bson.D{{Key: "date", Value: -1}}) // Sort by date descending

	cursor, err := config.DB.Collection("gallery").Find(ctx, bson.M{}, findOptions)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not fetch gallery images"})
	}
	defer cursor.Close(ctx)

	var images []models.GalleryImageModel

	if err := cursor.All(ctx, &images); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Could not parse gallery images"})
	}

	return c.JSON(images)
}
