package controllers

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v7"
	"github.com/qiniu/rpc.v1"
	"github.com/qiniu/xlog.v1"
	"gopkg.in/mgo.v2/bson"
	mongoClient "qiniu.com/rmb-web/admin-backend/mongo-api/client"
	"qiniu.com/rmb-web/puck/v3/utils/auth"

	"qiniu.com/www/admin-backend/codes"
	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/models"
	"qiniu.com/www/admin-backend/service/counter"
	"qiniu.com/www/admin-backend/service/lilliput"
	"qiniu.com/www/admin-backend/service/morse"
	"qiniu.com/www/admin-backend/service/verification"
	"qiniu.com/www/admin-backend/utils"
)

const sameUidLimitNum = 100

type Activity struct {
	conf                *config.Config
	mongoService        *mongoClient.MongoApiServiceWithAuth
	lilliputService     *lilliput.LilliputService
	morseService        *morse.MorseService
	verificationService verification.Service
}

func NewActivity(config *config.Config) *Activity {
	transport := auth.NewQiniuAuthTransport(config.Admin.AccessKey, config.Admin.SecretKey, http.DefaultTransport)
	host := []string{fmt.Sprintf("http://127.0.0.1:%d", config.Port)}
	mongoService := mongoClient.NewMongoApiServiceWithAuth(host, config.MongoApiPrefix, transport)
	lilliputService := lilliput.NewLilliputService(config.LilliputHost, http.DefaultTransport)
	morseService := morse.NewMorseService(config.MorseHost, config.MorseClientId)
	redisClient := redis.NewUniversalClient(&redis.UniversalOptions{Addrs: strings.Split(config.RedisHosts, ",")})
	redisCounterService := counter.NewRedisCounterService(redisClient)
	redisStore := verification.NewRedisStore(redisClient)
	verificationService := verification.NewVerificationService(redisCounterService, SMSVerificationConfig, redisStore)
	return &Activity{
		conf:                config,
		mongoService:        mongoService,
		lilliputService:     lilliputService,
		morseService:        morseService,
		verificationService: verificationService,
	}
}

type activityRegInput struct {
	Uid                     uint32 `json:"uid"`
	UserName                string `json:"userName"`
	PhoneNumber             string `json:"phoneNumber"`
	Email                   string `json:"email"`
	Company                 string `json:"company"`
	Location                string `json:"location"`                // 所在地址
	Industry                string `json:"industry"`                // 所在行业
	Department              string `json:"department"`              // 部门
	Position                string `json:"position"`                // 职位
	Relationship            string `json:"relationship"`            // 和 qiniu 的关系
	MarketActivityId        string `json:"marketActivityId"`        // 报名活动 id
	MarketActivitySessionId string `json:"marketActivitySessionId"` // 报名活动场次 id
	Captcha                 string `json:"captcha"`                 // 手机验证码
}

func (i *activityRegInput) valid() (code codes.Code, valid bool) {
	if i.UserName == "" || i.Email == "" || i.PhoneNumber == "" || i.Company == "" ||
		i.Location == "" || i.Industry == "" || i.Department == "" || i.Position == "" ||
		i.Relationship == "" || i.MarketActivitySessionId == "" || i.Captcha == "" {
		code = codes.ArgsEmpty
		return
	}
	if !utils.EmailPattern.MatchString(i.Email) {
		code = codes.EmailInvalid
		return
	}
	if !utils.MobilePhonePattern.MatchString(i.PhoneNumber) {
		code = codes.PhoneNumInvalid
		return
	}
	if !bson.IsObjectIdHex(i.MarketActivityId) {
		code = codes.MarketActivityIdInvalid
		return
	}
	code = codes.OK
	valid = true
	return
}

func (m *Activity) ActivityRegistration(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var params activityRegInput
	err := c.BindJSON(&params)
	if err != nil {
		logger.Errorf("BindJSON error: %v", err)
		m.Send(c, codes.InvalidArgs, "bind json error")
		return
	}

	if code, valid := params.valid(); !valid {
		logger.Errorf("params(%+v) is invalid, code: %d", params, code)
		m.Send(c, code, nil)
		return
	}

	// 查看手机验证码是否正确
	if code := m.verifyCaptcha(logger, params.Captcha, params.PhoneNumber); code != codes.OK {
		logger.Errorf("verify captcha(%s) error: %s", params.Captcha, code.Humanize())
		m.Send(c, code, nil)
		return
	}

	var getRes models.PartOfMarketActivity
	// 查看当前活动是否存在
	err = m.mongoService.Get(logger, m.conf.MarketActivityResourceName, params.MarketActivityId, &getRes)
	if err != nil {
		if errInfo, ok := err.(*rpc.ErrorInfo); ok && errInfo.Code == 404 {
			logger.Errorf("market_activity_id(%s) not found", params.MarketActivityId)
			m.Send(c, codes.MarketActivityIdInvalid, "market_activity_id not found")
			return
		}
		logger.Errorf("%s get market_activity_id error: %v", m.conf.MarketActivityResourceName, err)
		m.Send(c, codes.ResultError, nil)
		return
	}
	// 场次 id 是否有效
	for index, session := range getRes.Sessions {
		if session.Id == params.MarketActivitySessionId {
			break
		}
		// 场次 id 不存在
		if index == len(getRes.Sessions)-1 {
			logger.Errorf("session id(%s) not found", params.MarketActivitySessionId)
			m.Send(c, codes.MarketActivitySessionIdInvalid, "not found")
			return
		}
	}

	// 活动如果需要登录才能报名，检查 uid 是否不为 0
	if !getRes.NoLoginRequired && params.Uid == 0 {
		logger.Errorf("login is required to register for market activity (id: %s, title: %s)",
			params.MarketActivityId, getRes.Title)
		m.Send(c, codes.UidRequired, nil)
		return
	}

	var listRes struct {
		Count int `json:"count"`
	}

	// 活动报名截止不能报名
	if getRes.ApplyEndTime < time.Now().Unix() {
		logger.Errorf("registration deadline error")
		m.Send(c, codes.Forbidden, nil)
		return
	}

	// 查看手机号是否已经存在
	phoneQuery := map[string]interface{}{
		"phoneNumber":             params.PhoneNumber,
		"marketActivityId":        params.MarketActivityId,
		"marketActivitySessionId": params.MarketActivitySessionId,
	}
	listQuery := mongoClient.ListQuery{
		Limit: "1",
		Query: phoneQuery,
	}
	err = m.mongoService.List(logger, m.conf.ActivityRegistrationResourceName, listQuery, &listRes)
	if err != nil {
		logger.Errorf("%s find phone_number(%s) error :%v",
			m.conf.ActivityRegistrationResourceName, params.PhoneNumber, err)
		m.Send(c, codes.ResultError, nil)
		return
	}
	if listRes.Count > 0 {
		logger.Errorf("phone number(%s) already exists", params.PhoneNumber)
		m.Send(c, codes.DuplicatePhoneNum, "phone number already exists")
		return
	}

	// 查看同一活动同一场次同一 uid 报名人数是否达到上限
	uidQuery := map[string]interface{}{
		"uid":                     params.Uid,
		"marketActivityId":        params.MarketActivityId,
		"marketActivitySessionId": params.MarketActivitySessionId,
	}
	listQuery = mongoClient.ListQuery{
		Limit: "1",
		Query: uidQuery,
	}
	err = m.mongoService.List(logger, m.conf.ActivityRegistrationResourceName, listQuery, &listRes)
	if err != nil {
		logger.Errorf("%s find same uid(%d) num error :%v", m.conf.ActivityRegistrationResourceName,
			params.Uid, err)
		m.Send(c, codes.ResultError, nil)
		return
	}
	if listRes.Count >= sameUidLimitNum {
		logger.Errorf("uid(%d) reach the limit number", params.Uid)
		m.Send(c, codes.SameUidRegistrationNumLimit, nil)
		return
	}

	var res models.ActivityRegistration
	// 提交用户活动报名请求
	activityRegParams := &models.ActivityRegistration{
		Uid:                     params.Uid,
		UserName:                params.UserName,
		PhoneNumber:             params.PhoneNumber,
		Email:                   params.Email,
		Company:                 params.Company,
		MarketActivityId:        params.MarketActivityId,
		MarketActivitySessionId: params.MarketActivitySessionId,
		Location:                params.Location,
		Industry:                params.Industry,
		Department:              params.Department,
		Position:                params.Position,
		Relationship:            params.Relationship,
		CreatedAt:               time.Now().Unix(),
		UpdatedAt:               time.Now().Unix(),
	}
	err = m.mongoService.Create(logger, m.conf.ActivityRegistrationResourceName, activityRegParams, &res)
	if err != nil {
		logger.Errorf("%s body(%v) error: %v", m.conf.ActivityRegistrationResourceName, activityRegParams, err)
		m.Send(c, codes.ResultError, nil)
		return
	}

	// 发送活动报名成功短信
	m.sendActivityRegSucceedSMS(logger, res.Id.Hex(), getRes.Title,
		m.conf.SMSTemplates.ActivityCheckinLinkPrefix, params.PhoneNumber, getRes.StartTime)

	m.Send(c, codes.OK, res)
}

// sendActivityRegSucceedSMS 发送报名成功短信通知
func (m *Activity) sendActivityRegSucceedSMS(logger *xlog.Logger, activityRegId, activityTitle,
	linkPrefix, phoneNumber string, activityStartTime int64) {

	url := utils.GetCheckinLinkUrl(logger, m.lilliputService, linkPrefix, activityRegId)
	// 发送短信
	data := map[string]interface{}{
		"Title":     activityTitle,
		"Link":      url,
		"StartTime": utils.FormatSecTime(activityStartTime),
	}
	in := morse.SendSmsIn{
		PhoneNumber: phoneNumber,
		TmplData:    data,
	}
	_, err := m.morseService.SendSms(logger, in, m.conf.SMSTemplates.ActivityRegSucceed)
	if err != nil {
		logger.Errorf("SendSms error: %v", err)
	}
	return
}

func (m *Activity) verifyCaptcha(logger *xlog.Logger, code string, key string) (resCode codes.Code) {
	if ok, err := m.verificationService.VerifyCaptcha(logger, code, key); !ok {
		switch err {
		case verification.CaptchaExpiredErr:
			resCode = codes.CaptchaExpired
		case verification.CaptchaIncorrectErr:
			resCode = codes.CaptchaIncorrect
		default:
			resCode = codes.ResultError
		}
		return
	}
	resCode = codes.OK
	return
}

type checkInInput struct {
	Id string `json:"id"`
}

func (p *checkInInput) valid() bool {
	return p.Id != ""
}

// CheckIn 用于报名用户签到
func (m *Activity) CheckIn(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var param checkInInput
	err := c.BindJSON(&param)
	if err != nil {
		logger.Errorf("BindJSON error: %v", err)
		m.Send(c, codes.InvalidArgs, "bind json error")
		return
	}
	if !param.valid() {
		logger.Errorf("param(%+v) is invalid", param)
		m.Send(c, codes.InvalidArgs, "param is invalid")
		return
	}

	// 查看报名信息是否存在若存在则查看对应报名信息是否已签到
	var res models.ActivityRegistration
	err = m.mongoService.Get(logger, m.conf.ActivityRegistrationResourceName, param.Id, &res)
	if err != nil {
		// 报名信息不存在
		if errInfo, ok := err.(*rpc.ErrorInfo); ok && errInfo.Code == 404 {
			logger.Errorf("activity_registration_id(%s) not found", param.Id)
			m.Send(c, codes.InvalidActivityRegistrationId, "activity_registration_id not found")
			return
		}
		logger.Errorf("get activity_registration_id(%s) error: %v", param.Id, err)
		m.Send(c, codes.ResultError, nil)
		return
	}
	if res.CheckedIn {
		logger.Errorf("activity_registration_id(%s) has already checked in", param.Id)
		m.Send(c, codes.ActivityRegistrationIdCheckedIn, nil)
		return
	}

	// 设置报名签到
	update := map[string]interface{}{
		"checkedIn": true,
		"updatedAt": time.Now().Unix(),
	}
	err = m.mongoService.Update(logger, m.conf.ActivityRegistrationResourceName, param.Id, update, nil)
	if err != nil {
		logger.Errorf("update activity_registration_id(%s) error: %v", param.Id, err)
		m.Send(c, codes.ResultError, nil)
		return
	}

	m.Send(c, codes.OK, nil)
}

func (m *Activity) Send(c *gin.Context, code codes.Code, data interface{}) {
	SendResponse(c, code, data)
}
