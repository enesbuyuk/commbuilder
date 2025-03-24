package server

import (
	"github.com/enesbuyuk/university-student-club-website/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func SetupServer() *fiber.App {
	app := fiber.New()

	// Middleware
	setupMiddleware(app)

	// Routes
	setupRoutes(app)

	return app
}

func setupMiddleware(app *fiber.App) {
	// will update this later
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "*",
	}))
}

func setupRoutes(app *fiber.App) {
	routes.AnnouncementRoutes(app)
	routes.EventsRoutes(app)
	routes.AuthRoutes(app)
}
