package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func GalleryRoutes(app *fiber.App) {
	app.Get("/gallery", handlers.GetGallery)
}
