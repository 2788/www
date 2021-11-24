package verification

import (
	"fmt"
	"time"

	"github.com/qiniu/xlog.v1"
	"qbox.us/verifycode"

	"qiniu.com/www/admin-backend/service/counter"
	"qiniu.com/www/admin-backend/utils"
)

type Service interface {
	GenerateCaptcha(logger *xlog.Logger, key string) (captcha string, err error)
	VerifyCaptcha(logger *xlog.Logger, captcha string, key string) (ok bool, err error)
}

type Config struct {
	CaptchaChars              []byte
	CaptchaLength             int
	CaptchaExpirationInterval int // 验证码过期时间间隔，单位：秒
	CaptchaLimit              int // 针对同一个 key 生成验证码的次数限制
	CaptchaLimitInterval      int // 在一段时间内限制对同一个 key 生成验证码的次数，单位：秒
}

type service struct {
	config         Config
	store          Store
	counterService counter.Service
}

func NewVerificationService(counterService counter.Service, config Config, store Store) Service {
	return &service{
		config:         config,
		store:          store,
		counterService: counterService,
	}
}

func (s *service) GenerateCaptcha(logger *xlog.Logger, key string) (captcha string, err error) {
	c := s.newCaptchaCounter(key)
	if c.Increase(1) == counter.LimitReachedError {
		return "", GenCaptchaTooFrequentlyErr
	}
	captcha = verifycode.NewLenChars(s.config.CaptchaLength, s.config.CaptchaChars)
	s.store.Set(s.getCaptchaKey(key), captcha, s.config.CaptchaExpirationInterval)
	return
}

func (s *service) getCaptchaKey(key string) string {
	return fmt.Sprintf("%s:captcha:%s", utils.RedisKeyPrefix, key)
}

func (s *service) newCaptchaCounter(key string) counter.Counter {
	return s.counterService.Create(s.getCaptchaCounterKey(key),
		s.config.CaptchaLimit, time.Duration(s.config.CaptchaLimitInterval)*time.Second)
}

func (s *service) getCaptchaCounterKey(key string) string {
	return fmt.Sprintf("%s:captcha:counter:%s", utils.RedisKeyPrefix, key)
}

func (s *service) VerifyCaptcha(logger *xlog.Logger, captcha string, key string) (ok bool, err error) {
	if captcha == "" {
		return false, CaptchaIncorrectErr
	}

	savedCaptcha := s.store.Get(s.getCaptchaKey(key))
	if savedCaptcha == "" {
		return false, CaptchaExpiredErr
	}

	if captcha != savedCaptcha {
		logger.Errorf("got(%s) but expected(%s)", captcha, savedCaptcha)
		return false, CaptchaIncorrectErr
	}

	s.store.Delete(s.getCaptchaKey(key))

	return true, nil
}
