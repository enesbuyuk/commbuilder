package models

type ContactModel struct {
	ID    string            `bson:"_id,omitempty" json:"id"`
	Key   string            `bson:"key" json:"key"`
	Name  map[string]string `bson:"name" json:"name"`
	Value map[string]string `bson:"value" json:"value"`
}