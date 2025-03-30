package config

import (
	"github.com/joho/godotenv"
	"log"
)

func init() {
	if err := godotenv.Load(); err != nil {
		// Log the warning but continue execution
		log.Println("Warning: .env file not found, using environment variables")
	}
}
