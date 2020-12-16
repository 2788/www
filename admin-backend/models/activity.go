package models

import (
	"gopkg.in/mgo.v2/bson"
)

type ActivityRegistration struct {
	Id               bson.ObjectId `json:"_id,omitempty" bson:"_id"`
	Uid              uint32        `json:"uid" bson:"uid"`
	UserName         string        `json:"userName" bson:"userName"`
	PhoneNumber      string        `json:"phoneNumber" bson:"phoneNumber"`
	Email            string        `json:"email" bson:"email"`
	Company          string        `json:"company" bson:"company"`
	MarketActivityId bson.ObjectId `json:"marketActivityId" bson:"marketActivityId"`
	HasBeenSent      bool          `json:"has_been_sent" bson:"has_been_sent"`
	SMSJobId         string        `json:"smsJobId" bson:"smsJobId"`
	CreatedAt        int64         `json:"createdAt" bson:"createdAt"`
	UpdatedAt        int64         `json:"updatedAt" bson:"updatedAt"`
}

type MarketActivity struct {
	Id              bson.ObjectId `bson:"_id"`
	Title           string        `bson:"title"`
	ImgUrl          string        `bson:"imgUrl"`
	Desc            string        `bson:"desc"`
	State           int           `bson:"state"`           // 0 draft，1 release
	ReminderTime    int64         `bson:"reminderTime"`    // 活动开始前多少分钟提醒
	EnableReminder  bool          `bson:"enableReminder"`  // 是否开启提醒
	StartTime       int64         `bson:"startTime"`       // 活动开始时间
	EndTime         int64         `bson:"endTime"`         // 活动结束时间
	ApplyEndTime    int64         `bson:"applyEndTime"`    // 报名截止时间
	EditTime        int64         `bson:"editTime"`        // 修改时间
	Detail          string        `bson:"detail"`          // 详情
	DetailUrlPrefix string        `bson:"detailUrlPrefix"` // 详情页面 url 前缀
	NoticeStatus    int           `bson:"noticeStatus"`    // 0 未通知，1 开始通知，2 通知结束
}
