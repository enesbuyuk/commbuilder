package main

import (
	"github.com/enesbuyuk/university-student-club-website/pkg/config"
	routes2 "github.com/enesbuyuk/university-student-club-website/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"log"
)

func main() {
	db := config.ConnectDB()
	defer db.Client().Disconnect(nil)

	app := fiber.New()

	routes2.AnnouncementRoutes(app)
	routes2.EventsRoutes(app)
	routes2.AuthRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
