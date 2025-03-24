package server

import "github.com/gofiber/fiber/v2"

func SetupServer() *fiber.App {
	app := fiber.New()

	// Middleware
	setupMiddleware(app)

	// Routes
	setupRoutes(app)

	return app
}
