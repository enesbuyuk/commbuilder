package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/enesbuyuk/commbuildersite/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func ContactRoutes(app *fiber.App) {
	app.Get("/contact", handlers.GetContacts)
	app.Get("/contact/:key", handlers.GetContact)
	app.Post("/contact", middleware.JwtMiddleware, handlers.PostContact)
	app.Put("/contact/:key", middleware.JwtMiddleware, handlers.PutContact)
	app.Delete("/contact/:key", middleware.JwtMiddleware, handlers.DeleteContact)
}