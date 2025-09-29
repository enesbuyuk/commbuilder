package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/enesbuyuk/commbuildersite/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func LinksRoutes(app *fiber.App) {
	app.Get("/links", handlers.GetLinks)
	app.Post("/links", middleware.JwtMiddleware, handlers.PostLinks)
	app.Put("/links/:id", middleware.JwtMiddleware, handlers.PutLinks)
	app.Delete("/links/:id", middleware.JwtMiddleware, handlers.DeleteLinks)
}
