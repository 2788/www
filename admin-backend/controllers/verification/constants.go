package verification

import "fmt"

type operationType int

const opActivityRegistration operationType = iota + 1

func (o operationType) Humanize() string {
	switch o {
	case opActivityRegistration:
		return "活动报名"
	default:
		return "未知操作"
	}
}

func (o operationType) Valid() bool {
	switch o {
	case opActivityRegistration:
		return true
	default:
		return false
	}
}

func (o operationType) SMSTmplContent() string {
	return fmt.Sprintf("您正在进行%s操作, 验证码: [[.Captcha]]，[[.Time]] 分钟内有效。", o.Humanize())
}
