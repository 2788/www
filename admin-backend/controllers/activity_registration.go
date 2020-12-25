package controllers

import (
	"fmt"
	"net/http"
	"regexp"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/rpc.v1"
	"github.com/qiniu/xlog.v1"
	"gopkg.in/mgo.v2/bson"
	mongoClient "qiniu.com/rmb-web/admin-backend/mongo-api/client"
	"qiniu.com/rmb-web/puck/v3/utils/auth"

	"qiniu.com/www/admin-backend/codes"
	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/models"
)

const SameUidLimitNum = 100

var (
	EmailPattern       = regexp.MustCompile("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[a-zA-Z0-9](?:[\\w-]*[\\w])?")
	MobilePhonePattern = regexp.MustCompile(`^(13[0-9]|14[579]|15[012356789]|166|17[235678]|18[0-9]|19[01589])[0-9]{8}$`)
)

type Activity struct {
	conf *config.Config
}

func NewActivity(config *config.Config) *Activity {
	return &Activity{conf: config}
}

type activRegInput struct {
	Uid              uint32 `json:"uid"`
	UserName         string `json:"userName"`
	PhoneNumber      string `json:"phoneNumber"`
	Email            string `json:"email"`
	Company          string `json:"company"`
	MarketActivityId string `json:"marketActivityId"`
}

func (m *Activity) ActivityRegistration(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var res interface{}
	var params activRegInput
	err := c.BindJSON(&params)
	if err != nil {
		logger.Errorf("BindJSON error: ", err)
		m.Send(c, codes.InvalidArgs, "bind json error")
		return
	}

	if params.UserName == "" || params.Email == "" || params.PhoneNumber == "" {
		logger.Errorf("name(%s) or email(%s) or phone_number(%s) is empty", params.UserName, params.Email, params.PhoneNumber)
		m.Send(c, codes.ArgsEmpty, "name or email or phone_number is empty")
		return
	}
	if !EmailPattern.MatchString(params.Email) {
		logger.Errorf("email(%s) is invalid", params.Email)
		m.Send(c, codes.EmailInvalid, nil)
		return
	}
	if !MobilePhonePattern.MatchString(params.PhoneNumber) {
		logger.Errorf("phone(%s) is invalid", params.PhoneNumber)
		m.Send(c, codes.PhoneNumInvalid, nil)
		return
	}

	if !bson.IsObjectIdHex(params.MarketActivityId) {
		logger.Errorf("market_activity_id(%s) is invalid", params.MarketActivityId)
		m.Send(c, codes.MarketActivityIdInvalid, nil)
		return
	}

	transport := auth.NewQiniuAuthTransport(m.conf.Admin.AccessKey, m.conf.Admin.SecretKey, http.DefaultTransport)
	host := []string{fmt.Sprintf("http://127.0.0.1:%d", m.conf.Port)}
	mongoService := mongoClient.NewMongoApiServiceWithAuth(host, m.conf.MongoApiPrefix, transport)

	var getRes models.PartOfMarketActivity
	// 查看当前活动是否存在
	err = mongoService.Get(logger, m.conf.MarketActivityResourceName, params.MarketActivityId, &getRes)
	if err != nil {
		if errInfo, ok := err.(*rpc.ErrorInfo); ok && errInfo.Code == 404 {
			logger.Errorf("market_activity_id(%s) not found", params.MarketActivityId)
			m.Send(c, codes.MarketActivityIdInvalid, "market_activity_id not found")
			return
		}
		logger.Errorf("%s get market_activity_id error :%v", m.conf.MarketActivityResourceName, err)
		m.Send(c, codes.ResultError, nil)
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
		"phoneNumber":      params.PhoneNumber,
		"marketActivityId": params.MarketActivityId,
	}
	listQuery := mongoClient.ListQuery{
		Limit: "1",
		Query: phoneQuery,
	}
	err = mongoService.List(logger, m.conf.ActivityRegistrationResourceName, listQuery, &listRes)
	if err == nil {
		if listRes.Count > 0 {
			logger.Errorf("phone number(%s) already exists", params.PhoneNumber)
			m.Send(c, codes.DuplicatePhoneNum, "phone number already exists")
			return
		}
	} else {
		logger.Errorf("%s find phone_number(%s) error :%v", m.conf.ActivityRegistrationResourceName, params.PhoneNumber, err)
		m.Send(c, codes.ResultError, nil)
		return
	}

	// 查看同一活动同一 uid 报名人数是否达到上限
	uidQuery := map[string]interface{}{
		"uid":              params.Uid,
		"marketActivityId": params.MarketActivityId,
	}
	listQuery = mongoClient.ListQuery{
		Limit: "1",
		Query: uidQuery,
	}
	err = mongoService.List(logger, m.conf.ActivityRegistrationResourceName, listQuery, &listRes)
	if err == nil {
		if listRes.Count >= SameUidLimitNum {
			logger.Errorf("uid(%d) reach the limit number", params.Uid)
			m.Send(c, codes.SameUidRegistrationNumLimit, nil)
			return
		}
	} else {
		logger.Errorf("%s find same uid(%d) num error :%v", m.conf.ActivityRegistrationResourceName, params.Uid, err)
		m.Send(c, codes.ResultError, nil)
		return
	}

	// 提交用户活动报名请求
	activRegisParams := &models.ActivityRegistration{
		Uid:              params.Uid,
		UserName:         params.UserName,
		PhoneNumber:      params.PhoneNumber,
		Email:            params.Email,
		Company:          params.Company,
		MarketActivityId: params.MarketActivityId,
		CreatedAt:        time.Now().Unix(),
		UpdatedAt:        time.Now().Unix(),
	}
	err = mongoService.Create(logger, m.conf.ActivityRegistrationResourceName, activRegisParams, &res)
	if err != nil {
		logger.Errorf("%s body(%v) error :%v", m.conf.ActivityRegistrationResourceName, activRegisParams, err)
		m.Send(c, codes.ResultError, nil)
		return
	}

	m.Send(c, codes.OK, res)
}

func (m *Activity) Send(c *gin.Context, code codes.Code, data interface{}) {
	SendResponse(c, code, data)
}
