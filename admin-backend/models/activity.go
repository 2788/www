package models

import (
	"gopkg.in/mgo.v2/bson"
	"sort"
)

type ReminderStatus int

const (
	NotStart   ReminderStatus = iota // 未提醒
	InProgress                       // 开始提醒
	Succeeded                        // 提醒完成
)

type ActivityState int

const (
	Draft   ActivityState = iota // 草稿
	Release                      //发布
)

// ActivityRegistrationReminder 标记接收到的活动通知的 reminder 信息
type ActivityRegistrationReminder struct {
	Id       string `json:"id"`       // 标记接收到的 `reminderId`
	SMSJobId string `json:"smsJobId"` // 记录每个 `reminder` 发送时对应的 `smsJobId`
}

type ActivityRegistration struct {
	Id               bson.ObjectId                  `json:"_id,omitempty"`
	Uid              uint32                         `json:"uid,omitempty"`
	CheckedIn        bool                           `json:"checkedIn"` // 是否签到
	UserName         string                         `json:"userName"`
	PhoneNumber      string                         `json:"phoneNumber"`
	Email            string                         `json:"email"`
	Company          string                         `json:"company"`
	MarketActivityId string                         `json:"marketActivityId"`
	HasBeenSent      bool                           `json:"hasBeenSent"` // deprecated TODO: 删除
	SMSJobId         string                         `json:"smsJobId"`    // deprecated TODO: 删除
	Reminders        []ActivityRegistrationReminder `json:"reminders"`
	CreatedAt        int64                          `json:"createdAt"`
	UpdatedAt        int64                          `json:"updatedAt"`
}

// PartOfMarketActivity 为 `admin-backend` 中需要使用到的部分活动字段
type PartOfMarketActivity struct {
	Id              bson.ObjectId `json:"_id"`
	Title           string        `json:"title"`
	State           ActivityState `json:"state"`           // 0 draft，1 release
	NoLoginRequired bool          `json:"noLoginRequired"` // 是否不需要登录，默认都是需要登录才能报名的活动
	EnableReminder  bool          `json:"enableReminder"`  // 是否开启提醒
	StartTime       int64         `json:"startTime"`       // 活动开始时间
	DetailUrlPrefix string        `json:"detailUrlPrefix"` // 详情页面 url 前缀
	// TODO: 删除 `NoticeStatus` 字段
	// NoticeStatus 该字段已废弃，为兼容现有逻辑而保留，当不再有旧数据未处理时就会去掉这个字段
	NoticeStatus int       `json:"noticeStatus"`
	ApplyEndTime int64     `json:"applyEndTime"` // 报名截止时间
	Reminders    Reminders `json:"reminders"`    // 活动提醒
}

type Reminder struct {
	Id             string         `json:"id"`           // reminder 唯一标识
	ReminderTime   int64          `json:"reminderTime"` // 活动开始前多少分钟提醒
	ReminderStatus ReminderStatus `json:"reminderStatus"`
	CreatedAt      int64          `json:"createdAt"`
	UpdatedAt      int64          `json:"updatedAt"`
}

// NeedToSend 判断当前 Reminder 是否需要发送提醒
func (r Reminder) NeedToSend(now, startTime int64) bool {
	if r.ReminderStatus != Succeeded && r.ReminderTime*60+now >= startTime {
		return true
	}
	return false
}

// Reminders 排序按照 ReminderTime 的值从小到大排序
type Reminders []Reminder

func (r Reminders) Less(i, j int) bool {
	if r[i].ReminderTime < r[j].ReminderTime {
		return true
	}
	return false
}

func (r Reminders) Swap(i, j int) {
	r[i], r[j] = r[j], r[i]
}

func (r Reminders) Len() int {
	return len(r)
}

func (r Reminders) Sort() {
	sort.Sort(r)
}
