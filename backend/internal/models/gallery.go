package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type GalleryImageModel struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Title       map[string]string  `bson:"title" json:"title"`
	Description map[string]string  `bson:"description" json:"description"`
	Date        primitive.DateTime `bson:"date" json:"date"`
}