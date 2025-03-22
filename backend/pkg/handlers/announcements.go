package handlers

import (
	"context"
	"github.com/enesbuyuk/university-student-club-website/pkg/config"
	"github.com/enesbuyuk/university-student-club-website/pkg/models"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"strconv"
	"time"
)

func GetAnnouncements(c *fiber.Ctx) error {
	var announcements []models.AnnouncementModel
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	limit, err := strconv.Atoi(c.Query("limit", "100"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid limit value"})
	}
	if limit > 200 {
		return c.Status(400).JSON(fiber.Map{"error": "Limit value is too high"})
	}

	cursor, err := config.DB.Collection("announcements").Find(ctx, bson.M{}, options.Find().SetSort(bson.M{"date": -1}).SetLimit(int64(limit)))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be retrieved"})
	}
	defer cursor.Close(ctx)

	if err := cursor.All(ctx, &announcements); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be processed"})
	}

	return c.JSON(announcements)
}

func PostAnnouncements(c *fiber.Ctx) error {
	announcement := new(models.AnnouncementModel)
	if err := c.BodyParser(announcement); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := config.DB.Collection("announcements").InsertOne(ctx, announcement)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Data could not be inserted"})
	}

	return c.JSON(announcement)
}
