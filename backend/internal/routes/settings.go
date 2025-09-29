package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/enesbuyuk/commbuildersite/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func SettingRoutes(app *fiber.App) {
	app.Get("/settings", middleware.JwtMiddleware, handlers.GetSettings)
	app.Get("/settings/:key", handlers.GetSetting)
	app.Post("/settings", middleware.JwtMiddleware, handlers.PostSettings)
	app.Put("/settings/:id", middleware.JwtMiddleware, handlers.PutSettings)
}
