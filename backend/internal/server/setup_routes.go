package server

import (
	"github.com/enesbuyuk/commbuildersite/internal/routes"
	"github.com/gofiber/fiber/v2"
)

func setupRoutes(app *fiber.App) {
	routes.AuthRoutes(app)
	routes.AnnouncementRoutes(app)
	routes.EventsRoutes(app)
	routes.UsefulLinksRoutes(app)
	routes.LinksRoutes(app)
	routes.TeamsRoutes(app)
	routes.GalleryRoutes(app)
	routes.ContactRoutes(app)
	routes.SettingRoutes(app)
}
