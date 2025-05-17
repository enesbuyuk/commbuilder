package server

import (
	"github.com/enesbuyuk/university-student-club-website/pkg/routes"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	routes.AuthRoutes(app)
	routes.AnnouncementRoutes(app)
	routes.EventsRoutes(app)
	routes.UsefulLinksRoutes(app)
	routes.LinksRoutes(app)
	routes.TeamsRoutes(app)
}
