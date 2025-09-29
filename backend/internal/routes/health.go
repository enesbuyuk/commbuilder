package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func HealthRoutes(app *fiber.App) {
	app.Get("/health", handlers.GetHealth)
}