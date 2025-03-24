package routes

import (
	"github.com/enesbuyuk/university-student-club-website/pkg/handlers"
	"github.com/enesbuyuk/university-student-club-website/pkg/middleware"
	"github.com/gofiber/fiber/v2"
)

func UsefulLinksRoutes(app *fiber.App) {
	app.Get("/useful-links", handlers.GetUsefulLinks)
	app.Post("/useful-links", middleware.JwtMiddleware, handlers.PostUsefulLinks)
	app.Put("/useful-links/:id", middleware.JwtMiddleware, handlers.PutUsefulLinks)
	app.Delete("/useful-links/:id", middleware.JwtMiddleware, handlers.DeleteUsefulLinks)
}
