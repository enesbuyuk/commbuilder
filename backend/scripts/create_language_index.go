package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/enesbuyuk/commbuildersite/internal/config"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	config.ConnectDB()
	
	collection := config.DB.Collection("languages")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	indexModel := mongo.IndexModel{
		Keys: bson.D{
			{Key: "language", Value: 1},
		},
		Options: options.Index().SetUnique(true).SetName("language_code_idx"),
	}

	indexName, err := collection.Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatalf("Failed to create index: %v", err)
	}

	fmt.Printf("Index created successfully: %s\n", indexName)
	fmt.Println("This will significantly improve language query performance!")
}
