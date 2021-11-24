package sms

import (
	"qiniu.com/www/admin-backend/service/counter"
	"qiniu.com/www/admin-backend/service/verification"
)

var VerificationConfig = verification.Config{
	CaptchaChars:              verification.NumberChars,
	CaptchaLength:             6,
	CaptchaExpirationInterval: 60 * 60, // 1 小时
	CaptchaLimit:              10,
	CaptchaLimitInterval:      60 * 60,
}

func NewSmsVerification(counterService counter.Service, store verification.Store) verification.Service {
	return verification.NewVerificationService(counterService, VerificationConfig, store)
}
