package handlers

import (
	"context"
	"time"

	"github.com/enesbuyuk/commbuildersite/internal/config"
	"github.com/enesbuyuk/commbuildersite/internal/models"
	"github.com/gofiber/fiber/v2"
)

func GetHealth(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	dbStatus := "ok"
	if err := config.DB.Client().Ping(ctx, nil); err != nil {
		dbStatus = "error"
	}

	resp := models.Health{
		Status: "ok",
		DB:     dbStatus,
	}

	if dbStatus == "error" {
		return c.Status(fiber.StatusInternalServerError).JSON(resp)
	}

	return c.JSON(resp)
}
