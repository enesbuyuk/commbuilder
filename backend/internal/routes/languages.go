package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func LanguageRoutes(app *fiber.App) {
	app.Get("/languages", handlers.GetLanguages)
	app.Get("/languages/:code", handlers.GetLanguageByCode)
}
