package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var DB *mongo.Database

func ConnectDB() *mongo.Database {
	clientOptions := options.Client().ApplyURI("mongodb://" + os.Getenv("MONGODB_USERNAME") + ":" + os.Getenv("MONGODB_PASSWORD") + "@" + os.Getenv("MONGODB_HOST") + ":" + os.Getenv("MONGODB_PORT"))

	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	DB = client.Database(os.Getenv("MONGODB_DATABASE"))
	fmt.Println("Connected to MongoDB!")

	return DB
}
