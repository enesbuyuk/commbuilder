package routes

import (
	"github.com/enesbuyuk/university-student-club-website/internal/handlers"
	"github.com/enesbuyuk/university-student-club-website/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func LinksRoutes(app *fiber.App) {
	app.Get("/links", handlers.GetLinks)
	app.Post("/links", middleware.JwtMiddleware, handlers.PostLinks)
	app.Put("/links/:id", middleware.JwtMiddleware, handlers.PutLinks)
	app.Delete("/links/:id", middleware.JwtMiddleware, handlers.DeleteLinks)
}
