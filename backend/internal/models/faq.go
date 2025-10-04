package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type FaqModel struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Question    map[string]string  `bson:"question" json:"question"`
	Answer      map[string]string  `bson:"answer" json:"answer"`
}
