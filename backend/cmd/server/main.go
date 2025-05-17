package main

import (
	"context"
	"github.com/enesbuyuk/university-student-club-website/internal/config"
	"github.com/enesbuyuk/university-student-club-website/internal/server"
	"log"
	"os"
	"time"
)

func main() {
	db := config.ConnectDB()
	defer func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := db.Client().Disconnect(ctx); err != nil {
			log.Println("Error disconnecting from database:", err)
		} else {
			log.Println("Database disconnected successfully")
		}
	}()

	app := server.SetupServer()

	if err := app.Listen(":" + os.Getenv("BACKEND_PORT")); err != nil {
		log.Fatal(err)
	}
}
