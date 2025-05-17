package routes

import (
	"github.com/enesbuyuk/university-student-club-website/internal/handlers"
	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	app.Get("/auth", handlers.GetAuth)
	app.Post("/auth", handlers.PostAuth)
}
