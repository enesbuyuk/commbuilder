package routes

import (
	"github.com/enesbuyuk/university-student-club-website/pkg/handlers"
	"github.com/enesbuyuk/university-student-club-website/pkg/middleware"
	"github.com/gofiber/fiber/v2"
)

func EventsRoutes(app *fiber.App) {
	app.Get("/events", handlers.GetEvents)
	app.Post("/events", middleware.JwtMiddleware, handlers.PostEvents)
}
