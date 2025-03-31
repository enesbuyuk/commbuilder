package config

import (
	"github.com/joho/godotenv"
	"log"
)

func init() {
	// ../.env file is used for development mode. In production, environment variables are typically managed through Docker.
	if err := godotenv.Load("../.env"); err != nil {
		// Log the warning but continue execution
		log.Println("Warning: .env file not found, using environment variables")
	}
}
