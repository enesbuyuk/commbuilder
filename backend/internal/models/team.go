package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TeamMemberModel struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name        string             `bson:"name" json:"name"`
	Position    map[string]string  `bson:"position" json:"position"`
	Description map[string]string  `bson:"description" json:"description"`
	Email       string             `bson:"email" json:"email"`
	Linkedin    string             `bson:"linkedin" json:"linkedin"`
}

type TeamModel struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Period     string             `bson:"period" json:"period"`
	Management []TeamMemberModel  `bson:"management" json:"management"`
	Auditing   []TeamMemberModel  `bson:"auditing" json:"auditing"`
}
