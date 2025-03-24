package server

import (
	"github.com/enesbuyuk/university-student-club-website/pkg/routes"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	routes.AnnouncementRoutes(app)
	routes.EventsRoutes(app)
	routes.AuthRoutes(app)
}
