package user

import (
	"fmt"

	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"qiniu.com/www/controllers"
	"qiniu.com/www/service/account"
)

type SSOSignin struct {
	controllers.Base
	SSOService account.SSOService
}

func NewSSOController(service account.SSOService) *SSOSignin {
	return &SSOSignin{
		SSOService: service,
	}
}

func (s *SSOSignin) SignIn(ctx *gin.Context) {
	var (
		pass  bool
		query = s.SSOService.BuildLoginURL()
	)

	defer func() {
		if !pass {
			location := fmt.Sprintf("%s/?%s", query.Get("redirect"), query.Encode())
			http.Redirect(s.Rw, s.Req, location, http.StatusFound)
		} else {
			redirect := query.Get("redirect")
			if redirect == "" {
				redirect = "/"
			}
			http.Redirect(s.Rw, s.Req, redirect, http.StatusFound)
		}
	}()

	ssid, err := s.Req.Cookie("SSID")
	if err != nil || ssid == nil {
		return
	}

	// 从 session 中获取 ssid
	session := sessions.Default(ctx)
	sessionSsid := session.Get("SSID")

	cookieSsid, _, ok := s.SSOService.SSODecodeCookieValue(ssid.Value)
	if !ok || cookieSsid == "" {
		return
	}

	if sessionSsid != nil && sessionSsid == cookieSsid {
		pass = true
		return
	}

	ssoInfo, err := s.SSOService.UidBySid(cookieSsid)
	if err != nil {
		return
	}
	session.Set("SSID", cookieSsid)
	session.Set("uid", ssoInfo.Uid)

	return
}
