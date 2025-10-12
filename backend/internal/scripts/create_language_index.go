package scripts

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


func CreateLanguageIndex() {
	collection := config.DB.Collection("languages")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Check if index already exists
	cursor, err := collection.Indexes().List(ctx)
	if err != nil {
		log.Printf("Warning: Failed to list indexes: %v", err)
		return
	}
	defer cursor.Close(ctx)

	indexExists := false
	var existingIndexes []bson.M
	if err = cursor.All(ctx, &existingIndexes); err != nil {
		log.Printf("Warning: Failed to decode indexes: %v", err)
		return
	}

	for _, index := range existingIndexes {
		if name, ok := index["name"].(string); ok && name == "language_code_idx" {
			indexExists = true
			break
		}
	}

	if indexExists {
		log.Println("Language index already exists")
		return
	}

	// Create the index
	indexModel := mongo.IndexModel{
		Keys: bson.D{
			{Key: "language", Value: 1},
		},
		Options: options.Index().SetUnique(true).SetName("language_code_idx"),
	}

	indexName, err := collection.Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Printf("Warning: Failed to create language index: %v", err)
		return
	}

	fmt.Printf("Language index created successfully: %s\n", indexName)
}
