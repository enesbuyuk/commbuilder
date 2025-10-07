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
	Speakers    []SpeakerModel     `bson:"speakers" json:"speakers"`
	Schedule    []ScheduleModel    `bson:"schedule" json:"schedule"`
}

type SpeakerModel struct {
	ID    string            `bson:"_id" json:"_id"`
	Name  map[string]string `bson:"name" json:"name"`
	Title map[string]string `bson:"title" json:"title"`
	Photo string            `bson:"photo" json:"photo"`
}

type ScheduleModel struct {
	Time        string            `bson:"time" json:"time"`
	Topic       map[string]string `bson:"topic" json:"topic"`
	Description map[string]string `bson:"description" json:"description"`
	SpeakerID   string            `bson:"speakerId" json:"speakerId"`
}
