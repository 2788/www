package user

import (
	"net/http"
	"strings"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"qiniu.com/www/code"
	"qiniu.com/www/service/account"
	"qiniu.com/www/service/gaea"
	"qiniu.com/www/utils/oauth"
)

type User struct {
	EmptyOauth      func() *oauth.Transport
	gaeaService     gaea.GaeaAdminService
	accAdminService account.AdminService
}

func NewUserController(acc account.AdminService, gaea gaea.GaeaAdminService) *User {
	return &User{
		gaeaService:     gaea,
		accAdminService: acc,
	}
}

type LoginParam struct {
	Email    string `json:"username"`
	Password string `json:"password"`
	// TotpCode     string `json:"totp_code"`
	// RecoveryCode string `json:"recovery_code"`
	// Captcha      string              `json:"captcha"`
	// CaptchaType  enumsV2.CaptchaType `json:"captcha_type"`
}

func (u *User) SignIn(ctx *gin.Context) {
	var param LoginParam

	err := ctx.Bind(&param)
	if err != nil {
		ctx.JSON(code.Forbidden.Code(), err)
		return
	}

	//1。TODO 验证码

	token, code_, err := u.EmptyOauth().ExchangeByPassword(param.Email, param.Password)
	if code_ != http.StatusOK || err != nil || token == nil {
		if err != nil {
			accError := account.Error{Error: err}
			switch {
			case accError.IsShortBlocked():
				ctx.JSON(code.SigninBlocked.Code(), err)
			case accError.IsFailedAuth():
				ctx.JSON(code.SigninWrongInfo.Code(), err)
				// TODO 增加验证码次数
				// c.increaseCaptchaCount(input.Email)
			default:
				ctx.JSON(code.SigninFailed.Code(), err)
			}
		} else {
			ctx.JSON(code.SigninFailed.Code(), err)
		}
		return
	}

	// //2. TODO 两步验证等

	// 3. TODO getAccInfoByToken
	userInfo, err := u.accAdminService.GetAccInfoByToken(token.AccessToken)
	if err != nil {
		ctx.JSON(http.StatusNotFound, err)
		return
	}
	// 4.TODO session set uid、token、refreshToken、TokenExpiry、UserType
	session := sessions.Default(ctx)
	session.Clear()
	err = SetAuthToSession(session, userInfo, token)
	if err != nil {
		logrus.Warn("<Signin.Post> setAuthToSession:", userInfo.Uid, err)
	}

	// 5. TODO 登陆成功->跳转？

	ctx.JSON(200, "ok")
	return
}

func (i *LoginParam) Valid() bool {
	i.Email = strings.TrimSpace(i.Email)
	i.Password = strings.TrimSpace(i.Password)

	if i.Email == "" || i.Password == "" {
		return false
	}

	return true
}
