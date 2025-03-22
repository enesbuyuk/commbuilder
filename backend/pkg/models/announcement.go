package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AnnouncementModel struct {
	ID                      primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	AnnouncementType        string             `bson:"announcement_type" json:"announcement_type"`
	AnnouncementTitle       map[string]string  `bson:"announcement_title" json:"announcement_title"`
	AnnouncementDescription map[string]string  `bson:"announcement_description" json:"announcement_description"`
	AnnouncementDate        string             `bson:"announcement_date" json:"announcement_date"`
	AnnouncementURL         string             `bson:"announcement_url" json:"announcement_url"`
	EventType               map[string]string  `bson:"event_type" json:"event_type"`
}
