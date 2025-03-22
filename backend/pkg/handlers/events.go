package handlers

import (
	"context"
	"github.com/enesbuyuk/university-student-club-website/pkg/config"
	"github.com/enesbuyuk/university-student-club-website/pkg/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

func GetEvents(c *fiber.Ctx) error {
	var events []models.EventModel
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := config.DB.Collection("events").Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be retrieved"})
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &events); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be processed"})
	}

	return c.JSON(events)
}
