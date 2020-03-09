package code

const (
	/*************** 通用错误（小于1000） ***************/

	// OK ok
	OK Code = 200
	// NeedRedirect 需要重定向
	NeedRedirect Code = 301
	// InvalidArgs 请求参数错误或数据未通过验证
	InvalidArgs Code = 400
	// Unauthorized 授权数据未通过
	Unauthorized Code = 401
	// Forbidden 不允许使用此接口
	Forbidden Code = 403
	// NotFound 资源不存在
	NotFound Code = 404
	// Conflict 资源冲突/重复
	Conflict Code = 409
	// TooManyRequests 访问频率超过限制
	TooManyRequests Code = 429
	// ResultError 请求结果发生错误
	ResultError Code = 500
	// DatabaseError 后端数据库查询错误
	DatabaseError Code = 598
	// CSRFDetected 检查到 CSRF
	CSRFDetected Code = 599
)
const (
	// just a example
	ErrorcodeExample Code = 5000 // 特殊错误代码以 5000 起始

	// access error
	SigninWrongInfo  Code = 5100 // 账户或密码错误
	SigninFailed     Code = 5101 // 登录失败，可能服务器错误
	SigninBlocked    Code = 5102 // 超过5次，被Block，等待5分钟
	InvalidToken     Code = 5103 // token, refresh_token 过期或错误
	OverQuota        Code = 5104 // 超过配额
	OpIsNotConfirmed Code = 5105 // 需要密码确认的C操作没有确认密码

	// idempotence
	// 服务端错误，并且使用了excode, 无法回滚
	WrongCodeConsumed Code = 5107
)

// Code type for error code
type Code int

// Code returns error code
func (c Code) Code() int {
	return int(c)
}
