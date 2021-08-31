package codes

type Code interface {
	Code() int
	Humanize() string
}

const (
	OK code = 200

	InvalidArgs code = 400 // 请求参数错误，或者数据未通过验证
	Forbidden   code = 403 // 不允许使用此接口
	ResultError code = 500 // 请求结果发生错误
)

// 特殊错误
const (
	// 100000 以上的 code 用前三位代表想要返回的 http code. 例如: 401001, 代表返回的 http code 为 401

	ArgsEmpty                       code = 400001 // 必填参数为空
	EmailInvalid                    code = 400002 // 邮箱不合法
	DuplicatePhoneNum               code = 400003 // 电话号码重复
	MarketActivityIdInvalid         code = 400004 // 市场活动 id 不合法
	SameUidRegistrationNumLimit     code = 400005 // 同一个 uid 报名人数达到上限
	PhoneNumInvalid                 code = 400006 // 电话号码不合法
	UidRequired                     code = 400007 // 需要 uid
	InvalidActivityRegistrationId   code = 400008 // 不合法的活动报名 id
	ActivityRegistrationIdCheckedIn code = 400009 // 活动报名 id 已经签到
)

var codeHumanize = map[code]string{
	OK:          "ok",
	InvalidArgs: "invalid args",
	Forbidden:   "forbidden",
	ResultError: "response result error",

	ArgsEmpty:                       "args empty",
	EmailInvalid:                    "email is invalid",
	DuplicatePhoneNum:               "duplicate phone number",
	MarketActivityIdInvalid:         "market activity id is invalid",
	SameUidRegistrationNumLimit:     "reach the limit number of same uid",
	PhoneNumInvalid:                 "phone number is invalid",
	UidRequired:                     "uid is required",
	InvalidActivityRegistrationId:   "activity registration id is invalid",
	ActivityRegistrationIdCheckedIn: "activity registration id has already checked in",
}

type code int

func (c code) Code() int {
	return int(c)
}

func (c code) Humanize() string {
	return codeHumanize[c]
}
