package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/enesbuyuk/commbuildersite/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func EventsRoutes(app *fiber.App) {
	app.Get("/events", handlers.GetEvents)
	app.Get("/events/:id", handlers.GetEventByID)
	app.Post("/events", middleware.JwtMiddleware, handlers.PostEvents)
	app.Put("/events/:id", middleware.JwtMiddleware, handlers.PutEvents)
	app.Delete("/events/:id", middleware.JwtMiddleware, handlers.DeleteEvents)
}
