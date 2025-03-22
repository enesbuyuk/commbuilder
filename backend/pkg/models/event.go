package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type EventModel struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Type        map[string]string  `bson:"type" json:"type"`
	Title       map[string]string  `bson:"title" json:"title"`
	Description map[string]string  `bson:"description" json:"description"`
	Date        string             `bson:"date" json:"date"`
	URL         string             `bson:"url" json:"url"`
}
