package models

import (
	"gopkg.in/mgo.v2/bson"
)

type ActivityRegistration struct {
	Id               bson.ObjectId `json:"_id,omitempty"`
	Uid              uint32        `json:"uid"`
	UserName         string        `json:"userName"`
	PhoneNumber      string        `json:"phoneNumber"`
	Email            string        `json:"email"`
	Company          string        `json:"company"`
	MarketActivityId string        `json:"marketActivityId"`
	HasBeenSent      bool          `json:"hasBeenSent"`
	SMSJobId         string        `json:"smsJobId"`
	CreatedAt        int64         `json:"createdAt"`
	UpdatedAt        int64         `json:"updatedAt"`
}

type PartOfMarketActivity struct {
	Id              bson.ObjectId `json:"_id"`
	Title           string        `json:"title"`
	State           int           `json:"state"`           // 0 draft，1 release
	ReminderTime    int64         `json:"reminderTime"`    // 活动开始前多少分钟提醒
	EnableReminder  bool          `json:"enableReminder"`  // 是否开启提醒
	StartTime       int64         `json:"startTime"`       // 活动开始时间
	DetailUrlPrefix string        `json:"detailUrlPrefix"` // 详情页面 url 前缀
	NoticeStatus    int           `json:"noticeStatus"`    // 0 未通知，1 开始通知，2 通知结束
	ApplyEndTime    int64         `json:"applyEndTime"`    // 报名截止时间
}
