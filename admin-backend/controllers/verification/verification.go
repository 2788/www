package verification

import (
	"fmt"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v7"
	"github.com/qiniu/xlog.v1"

	"qiniu.com/www/admin-backend/codes"
	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/controllers"
	"qiniu.com/www/admin-backend/service/counter"
	"qiniu.com/www/admin-backend/service/morse"
	"qiniu.com/www/admin-backend/service/verification"
	"qiniu.com/www/admin-backend/utils"
)

const (
	limit         = 1  // 手机号请求次数限制
	limitInterval = 60 // 手机号请求次数限制时间间隔，单位：秒
)

type Verification struct {
	conf                   *config.Config
	morseService           *morse.MorseService
	counterService         counter.Service
	smsVerificationService verification.Service
}

func NewVerification(config *config.Config) *Verification {
	redisClient := redis.NewUniversalClient(&redis.UniversalOptions{Addrs: strings.Split(config.RedisHosts, ",")})
	redisCounterService := counter.NewRedisCounterService(redisClient)
	redisStore := verification.NewRedisStore(redisClient)
	smsVerificationService := verification.NewVerificationService(redisCounterService,
		controllers.SMSVerificationConfig, redisStore)
	morseService := morse.NewMorseService(config.MorseHost, config.MorseClientId)

	return &Verification{
		conf:                   config,
		morseService:           morseService,
		counterService:         redisCounterService,
		smsVerificationService: smsVerificationService,
	}
}

type sendSMSInput struct {
	PhoneNumber string        `json:"phone_number"`
	Operation   operationType `json:"operation"`
}

func (s *sendSMSInput) valid() (code codes.Code, valid bool) {
	if !utils.MobilePhonePattern.MatchString(s.PhoneNumber) {
		code = codes.PhoneNumInvalid
		return
	}
	if !s.Operation.Valid() {
		code = codes.InvalidArgs
		return
	}
	code = codes.OK
	valid = true
	return
}

func (v *Verification) SendSMS(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var input sendSMSInput
	err := c.BindJSON(&input)
	if err != nil {
		logger.Errorf("BindJSON error: %v", err)
		controllers.SendResponse(c, codes.InvalidArgs, "parse input failed")
		return
	}
	if code, valid := input.valid(); !valid {
		logger.Errorf("input(%+v) is invalid, code: %d", input, code)
		controllers.SendResponse(c, code, nil)
		return
	}

	// 查看手机号是否达到请求限制，相同手机号相同操作一分钟只允许请求 1 次
	key := getCounterKey(input.PhoneNumber, input.Operation)
	redisCounter := v.counterService.Create(key, limit, limitInterval*time.Second)
	if redisCounter.IsLimitReached() {
		logger.Errorf("key(%s) reached the limit(%d)", key, limit)
		controllers.SendResponse(c, codes.TooManyRequests, nil)
		return
	}

	captchaKey := getCaptchaKey(input.PhoneNumber, input.Operation)
	captcha, err := v.smsVerificationService.GenerateCaptcha(logger, captchaKey)
	if err != nil {
		logger.Errorf("GenerateCaptcha(%s) error: %v", captchaKey, err)
		if err == verification.GenCaptchaTooFrequentlyErr {
			controllers.SendResponse(c, codes.GenCaptchaTooFrequently, nil)
			return
		}
		controllers.SendResponse(c, codes.ResultError, nil)
		return
	}

	data := map[string]interface{}{
		"Captcha": captcha,
		"Time":    controllers.SMSVerificationConfig.CaptchaExpirationInterval,
	}
	in := morse.SendSmsIn{
		PhoneNumber: input.PhoneNumber,
		TmplData:    data,
	}
	_, err = v.morseService.SendSms(logger, in, input.Operation.SMSTmplContent())
	if err != nil {
		logger.Errorf("SendSms error: %v", err)
		controllers.SendResponse(c, codes.ResultError, nil)
		return
	}

	redisCounter.Increase(1)
	controllers.SendResponse(c, codes.OK, nil)
}

func getCounterKey(key string, typ operationType) string {
	return fmt.Sprintf("%s:verification:%s:%s", utils.RedisKeyPrefix, key, typ.String())
}

type verifySMSInput struct {
	Captcha     string        `json:"captcha"`
	PhoneNumber string        `json:"phone_number"`
	Operation   operationType `json:"operation"`
}

func (i verifySMSInput) valid() bool {
	if !utils.MobilePhonePattern.MatchString(i.PhoneNumber) {
		return false
	}
	if !i.Operation.Valid() {
		return false
	}

	return true
}

func (v *Verification) VerifySMS(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var input verifySMSInput
	err := c.BindJSON(&input)
	if err != nil {
		logger.Errorf("get input failed: %v", err)
		controllers.SendResponse(c, codes.InvalidArgs, nil)
		return
	}
	if !input.valid() {
		logger.Errorf("input(%+v) is invalid", input)
		controllers.SendResponse(c, codes.InvalidArgs, nil)
		return
	}

	captchaKey := getCaptchaKey(input.PhoneNumber, input.Operation)
	if ok, err := v.smsVerificationService.VerifyCaptcha(logger, input.Captcha, captchaKey); !ok {
		switch err {
		case verification.CaptchaExpiredErr:
			controllers.SendResponse(c, codes.CaptchaExpired, nil)
			return
		case verification.CaptchaIncorrectErr:
			controllers.SendResponse(c, codes.CaptchaIncorrect, nil)
			return
		default:
			controllers.SendResponse(c, codes.ResultError, nil)
			return
		}
	}

	controllers.SendResponse(c, codes.OK, nil)
	return
}

func getCaptchaKey(key string, typ operationType) string {
	return fmt.Sprintf("%s:%s", key, typ.String())
}
