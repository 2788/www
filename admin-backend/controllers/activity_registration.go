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
	cli := NewClient(fmt.Sprintf("http://127.0.0.1:%d", m.conf.Port), transport)

	// 查看当前活动是否存在
	getMarketActivByIdPath := fmt.Sprintf("%s/%s/%s", m.conf.MongoApiPrefix, m.conf.MarketActivityResourceName, params.MarketActivityId)
	err = cli.GetCall(logger, nil, getMarketActivByIdPath)
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

	var listResPart struct {
		Count int `json:"count"`
	}
	// 查看手机号是否已经存在
	getRegisActivByPhonePath := fmt.Sprintf("%s/%s?query={\"phoneNumber\":\"%s\",\"marketActivityId\":\"%s\"}&limit=1", m.conf.MongoApiPrefix, m.conf.ActivityRegistrationResourceName, params.PhoneNumber, params.MarketActivityId)
	err = cli.GetCall(logger, &listResPart, getRegisActivByPhonePath)
	if err == nil {
		if listResPart.Count > 0 {
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
	getSameUidNumPath := fmt.Sprintf("%s/%s?query={\"uid\":%d,\"marketActivityId\":\"%s\"}&limit=1", m.conf.MongoApiPrefix, m.conf.ActivityRegistrationResourceName, params.Uid, params.MarketActivityId)
	err = cli.GetCall(logger, &listResPart, getSameUidNumPath)
	if err == nil {
		if listResPart.Count >= SameUidLimitNum {
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
	regisActivPath := fmt.Sprintf("%s/%s", m.conf.MongoApiPrefix, m.conf.ActivityRegistrationResourceName)
	activRegisParams := &models.ActivityRegistration{
		Uid:              params.Uid,
		UserName:         params.UserName,
		PhoneNumber:      params.PhoneNumber,
		Email:            params.Email,
		Company:          params.Company,
		MarketActivityId: bson.ObjectIdHex(params.MarketActivityId),
		CreatedAt:        time.Now().Unix(),
		UpdatedAt:        time.Now().Unix(),
	}
	err = cli.CallWithJson(logger, &res, regisActivPath, activRegisParams)
	// 返回 201 是创建成功
	if err != nil {
		if errInfo, ok := err.(*rpc.ErrorInfo); !ok || errInfo.Code != 201 {
			logger.Errorf("%s body(%v) error :%v", m.conf.ActivityRegistrationResourceName, activRegisParams, err)
			m.Send(c, codes.ResultError, nil)
			return
		}
	}

	m.Send(c, codes.OK, res)
}

func (m *Activity) Send(c *gin.Context, code codes.Code, data interface{}) {
	SendResponse(c, code, data)
}
