package routes

import (
	"github.com/enesbuyuk/commbuildersite/internal/handlers"
	"github.com/enesbuyuk/commbuildersite/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func AnnouncementRoutes(app *fiber.App) {
	app.Get("/announcements", handlers.GetAnnouncements)
	app.Post("/announcements", middleware.JwtMiddleware, handlers.PostAnnouncements)
	app.Put("/announcements/:id", middleware.JwtMiddleware, handlers.PutAnnouncements)
	app.Delete("/announcements/:id", middleware.JwtMiddleware, handlers.DeleteAnnouncements)
}
