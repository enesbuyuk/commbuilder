package middleware

import (
	"github.com/gofiber/fiber/v2"
	"os"
)

func BackendAPITokenMiddleware(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")
	expectedToken := "Bearer " + os.Getenv("BACKEND_API_TOKEN")

	if authHeader != expectedToken {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "unauthorized: invalid BACKEND API token",
		})
	}

	return c.Next()
}
