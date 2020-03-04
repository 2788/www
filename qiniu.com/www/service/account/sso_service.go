package account

import (
	"crypto/hmac"
	"crypto/sha512"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"time"
)

const (
	SSOLoginToken = "sso_login_token"
	SSOLoginSSID  = "sso_login_ssid"
	SSOLoginState = "sso_login_state"
	SSOLoginInfo  = "sso_login_info"

	SSOLoginStateToken  = "token"
	SSOLoginStateCookie = "cookie"
)

type (
	SSOService interface {
		SSODecodeCookieValue(value string) (raw string, createdAt time.Time, ok bool)
		BuildLoginURL() url.Values
		UidBySid(cookieSsid string) (*SSOUserInfo, error)
	}

	ssoService struct {
		host        string
		adminClient *http.Client
		clientID    string
		// 如果你是使用的共享cookie的方式来做SSO的话，这个值需要配置成跟SSO相同。
		// 如果你使用的是token的方式，那么这个可以不需要配置
		cookieSecret string
	}

	SSOUserInfo struct {
		Uid uint32 `json:"uid"`
	}

	SSOError struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	}
)

var _ SSOService = &ssoService{}

func NewSSOService(host string, clientID string, cookieSecret string, adminTr http.RoundTripper) SSOService {
	adminClient := &http.Client{Transport: adminTr}

	return &ssoService{
		adminClient:  adminClient,
		host:         host,
		clientID:     clientID,
		cookieSecret: cookieSecret,
	}
}

func (s *ssoService) SSODecodeCookieValue(value string) (raw string, createdAt time.Time, ok bool) {
	rawBytes, _ := base64.URLEncoding.DecodeString(value)
	value = string(rawBytes)
	parts := strings.SplitN(value, ",", 3)
	if len(parts) < 3 {
		return
	}
	vRaw := strings.TrimSpace(parts[0])
	vCreated := strings.TrimSpace(parts[1])
	vHash := strings.TrimSpace(parts[2])
	if vRaw == "" || vCreated == "" || vHash == "" {
		return
	}
	vTime, _ := strconv.ParseInt(vCreated, 10, 64)
	if vTime <= 0 {
		return
	}
	vRaw, err := url.QueryUnescape(vRaw)
	if err != nil {
		return
	}
	h := hmac.New(sha512.New, []byte(s.cookieSecret))
	_, err = h.Write([]byte(vRaw + vCreated))
	if err != nil {
		return
	}
	if hex.EncodeToString(h.Sum(nil)) != vHash {
		return
	}
	raw = vRaw
	createdAt = time.Unix(0, vTime)
	ok = true
	return
}

func (s *ssoService) BuildLoginURL() url.Values {
	query := url.Values{}
	query.Set("client_id", s.clientID)
	query.Set("redirect", s.host)

	return query
}

func (s *ssoService) UidBySid(cookieSsid string) (*SSOUserInfo, error) {
	query := url.Values{}
	query.Set("client_id", s.clientID)
	if cookieSsid != "" {
		query.Set("ssid", cookieSsid)
	}

	url := fmt.Sprintf("%s/uinfo/session?%s", s.host, query.Encode())
	resp, err := s.adminClient.Get(url)
	if err != nil {
		return nil, err
	}

	// 后期，把所有resp的处理统一封个方法
	ret := &SSOUserInfo{}
	ssoErr := &SSOError{}
	if resp.StatusCode == 200 || resp.StatusCode == 204 {
		err = json.NewDecoder(resp.Body).Decode(ret)
		if err != nil {
			return nil, err
		}
	} else {
		err := json.NewDecoder(resp.Body).Decode(ssoErr)
		if err != nil {
			return nil, err
		}
		err = fmt.Errorf("%d: %s", ssoErr.Code, ssoErr.Message)
		return nil, err
	}

	return ret, nil
}
