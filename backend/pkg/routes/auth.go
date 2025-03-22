package routes

import (
	"github.com/enesbuyuk/university-student-club-website/pkg/handlers"
	"github.com/enesbuyuk/university-student-club-website/pkg/middleware"
	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	app.Get("/auth", handlers.GetAuth)
	app.Post("/auth", middleware.JwtMiddleware, handlers.PostAuth)
}
