package models

import (
	"gopkg.in/mgo.v2/bson"
)

type ActivityRegistration struct {
	Id               bson.ObjectId `json:"_id,omitempty"`
	UserName         string        `json:"userName"`
	PhoneNumber      string        `json:"phoneNumber"`
	Email            string        `json:"email"`
	Company          string        `json:"company"`
	MarketActivityId bson.ObjectId `json:"marketActivityId"`
	CreatedAt        int64         `json:"createdAt"`
	UpdatedAt        int64         `json:"updatedAt"`
}
