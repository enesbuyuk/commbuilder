package server

import (
	"github.com/enesbuyuk/commbuildersite/internal/middleware"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func setupMiddleware(app *fiber.App) {
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "*",
	}))
	app.Use(middleware.BackendAPITokenMiddleware)
}
