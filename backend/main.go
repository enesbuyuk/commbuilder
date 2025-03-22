package main

import (
	"context"
	"github.com/enesbuyuk/university-student-club-website/pkg/config"
	routes2 "github.com/enesbuyuk/university-student-club-website/pkg/routes"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
)

func main() {
	db := config.ConnectDB()
	defer func(client *mongo.Client, ctx context.Context) {
		err := client.Disconnect(ctx)
		if err != nil {
			log.Fatal(err)
		}
	}(db.Client(), nil)

	app := fiber.New()

	routes2.AnnouncementRoutes(app)
	routes2.EventsRoutes(app)
	routes2.AuthRoutes(app)

	log.Fatal(app.Listen(os.Getenv("BE_PORT")))
}
