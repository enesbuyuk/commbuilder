package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func FaqRoutes(app *fiber.App) {
	app.Get("/faq", handlers.GetFaq)
}