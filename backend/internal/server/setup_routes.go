package server

import (
	"github.com/enesbuyuk/commbuildersite/internal/routes"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	routes.HealthRoutes(app)
	routes.AuthRoutes(app)
	routes.AnnouncementRoutes(app)
	routes.EventsRoutes(app)
	routes.UsefulLinksRoutes(app)
	routes.LinksRoutes(app)
	routes.TeamsRoutes(app)
	routes.SettingRoutes(app)
}
