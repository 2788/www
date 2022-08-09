package codes

type Code interface {
	Code() int
	Humanize() string
}

const (
	OK code = 200

	InvalidArgs     code = 400 // 请求参数错误，或者数据未通过验证
	Forbidden       code = 403 // 不允许使用此接口
	TooManyRequests code = 429 // 请求太频繁
	ResultError     code = 500 // 请求结果发生错误
)

// 特殊错误
const (
	// 100000 以上的 code 用前三位代表想要返回的 http code. 例如: 401001, 代表返回的 http code 为 401

	ArgsEmpty                         code = 400001 // 必填参数为空
	EmailInvalid                      code = 400002 // 邮箱不合法
	DuplicatePhoneNum                 code = 400003 // 电话号码重复
	MarketActivityIdInvalid           code = 400004 // 市场活动 id 不合法
	SameUidRegistrationNumLimit       code = 400005 // 同一个 uid 报名人数达到上限
	PhoneNumInvalid                   code = 400006 // 电话号码不合法
	UidRequired                       code = 400007 // 需要 uid
	InvalidActivityRegistrationId     code = 400008 // 不合法的活动报名 id
	ActivityRegistrationIdCheckedIn   code = 400009 // 活动报名 id 已经签到
	MarketActivitySessionIdInvalid    code = 400010 // 市场活动场次 id 不合法
	CaptchaExpired                    code = 400011 // 验证码过期
	CaptchaIncorrect                  code = 400012 // 验证码不正确
	GenCaptchaTooFrequently           code = 400013 // 生成验证码太频繁
	ExceedLengthLimitForRefresh       code = 400014 // 超过 refresh 输入参数长度限制
	InvalidPaths                      code = 400015 // 不合法的 path 列表
	ExceedLengthLimitForPrefixRefresh code = 400016 // 超过前缀刷新输入参数长度限制
)

var codeHumanize = map[code]string{
	OK:              "ok",
	InvalidArgs:     "invalid args",
	Forbidden:       "forbidden",
	ResultError:     "response result error",
	TooManyRequests: "too many requests",

	ArgsEmpty:                         "args empty",
	EmailInvalid:                      "email is invalid",
	DuplicatePhoneNum:                 "duplicate phone number",
	MarketActivityIdInvalid:           "market activity id is invalid",
	SameUidRegistrationNumLimit:       "reach the limit number of same uid",
	PhoneNumInvalid:                   "phone number is invalid",
	UidRequired:                       "uid is required",
	InvalidActivityRegistrationId:     "activity registration id is invalid",
	ActivityRegistrationIdCheckedIn:   "activity registration id has already checked in",
	MarketActivitySessionIdInvalid:    "market activity session id is invalid",
	CaptchaExpired:                    "captcha expired",
	CaptchaIncorrect:                  "captcha incorrect",
	GenCaptchaTooFrequently:           "generate captcha too frequently",
	ExceedLengthLimitForRefresh:       "exceed length limit for refresh",
	InvalidPaths:                      "invalid paths",
	ExceedLengthLimitForPrefixRefresh: "exceed length limit for prefix refresh",
}

type code int

func (c code) Code() int {
	return int(c)
}

func (c code) Humanize() string {
	return codeHumanize[c]
}
