package main

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/enesbuyuk/commbuildersite/internal/config"
	"github.com/enesbuyuk/commbuildersite/internal/scripts"
	"github.com/enesbuyuk/commbuildersite/internal/server"
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

	scripts.RunAll()

	app := server.SetupServer()

	if err := app.Listen(":" + os.Getenv("BACKEND_PORT")); err != nil {
		log.Fatal(err)
	}
}
