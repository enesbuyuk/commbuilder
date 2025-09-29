package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type SettingModel struct {
	ID    primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Key   string             `bson:"key" json:"key"`
	Value string             `bson:"value" json:"value"`
}