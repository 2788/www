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
	"qiniu.com/www/admin-backend/service/verification/sms"
	"qiniu.com/www/admin-backend/utils"
)

const (
	limit         = 1  // 手机号请求次数限制
	limitInterval = 60 // 手机号请求次数限制时间间隔，单位：秒
)

type Verification struct {
	conf           *config.Config
	morseService   *morse.MorseService
	counterService counter.Service
	smsService     verification.Service
}

func NewVerification(config *config.Config) *Verification {
	redisClient := redis.NewUniversalClient(&redis.UniversalOptions{Addrs: strings.Split(config.RedisHosts, ",")})
	redisCounterService := counter.NewRedisCounterService(redisClient)
	redisStore := verification.NewRedisStore(redisClient)
	smsService := sms.NewSmsVerification(redisCounterService, redisStore)
	morseService := morse.NewMorseService(config.MorseHost, config.MorseClientId)

	return &Verification{
		conf:           config,
		morseService:   morseService,
		counterService: redisCounterService,
		smsService:     smsService,
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
		controllers.SendResponse(c, codes.InvalidArgs, "bind json error")
		return
	}
	if code, valid := input.valid(); !valid {
		logger.Errorf("input(%+v) is invalid, code: %d", input, code)
		controllers.SendResponse(c, code, nil)
		return
	}

	// 查看手机号是否达到请求限制，相同手机号一分钟只允许请求 1 次
	key := v.getCounterKey(input.PhoneNumber)
	redisCounter := v.counterService.Create(key, limit, limitInterval*time.Second)
	if redisCounter.IsLimitReached() {
		logger.Errorf("key(%s) reached the limit(%d)", key, limit)
		controllers.SendResponse(c, codes.TooManyRequests, nil)
		return
	}

	captcha, err := v.smsService.GenerateCaptcha(logger, input.PhoneNumber)
	if err != nil {
		logger.Errorf("GenerateCaptcha(%s) error: %v", input.PhoneNumber, err)
		if err == verification.GenCaptchaTooFrequentlyErr {
			controllers.SendResponse(c, codes.GenCaptchaTooFrequently, nil)
			return
		}
		controllers.SendResponse(c, codes.ResultError, nil)
		return
	}

	data := map[string]interface{}{
		"Captcha": captcha,
		"Time":    sms.VerificationConfig.CaptchaExpirationInterval / 60,
	}
	in := morse.SendSmsIn{
		PhoneNumber: input.PhoneNumber,
		TmplData:    data,
	}
	_, err = v.morseService.SendSms(logger, in, input.Operation.SMSTmplContent())
	if err != nil {
		logger.Errorf("SendSms error: %v", err)
	}

	redisCounter.Increase(1)
	controllers.SendResponse(c, codes.OK, nil)
}

func (v *Verification) getCounterKey(key string) string {
	return fmt.Sprintf("%s:%s", utils.RedisKeyPrefix, key)
}
