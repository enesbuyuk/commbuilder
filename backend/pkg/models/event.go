package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type EventModel struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Type        map[string]string  `bson:"event_type" json:"event_type"`
	Title       map[string]string  `bson:"event_title" json:"event_title"`
	Description map[string]string  `bson:"event_description" json:"event_description"`
	Date        string             `bson:"event_date" json:"event_date"`
	URL         string             `bson:"event_url" json:"event_url"`
}
