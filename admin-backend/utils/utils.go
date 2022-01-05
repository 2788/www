package utils

import (
	"fmt"
	"net"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/qiniu/xlog.v1"

	"qiniu.com/www/admin-backend/service/lilliput"
)

const RedisKeyPrefix = "uxd:www:admin-backend"

var (
	EmailPattern       = regexp.MustCompile("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[a-zA-Z0-9](?:[\\w-]*[\\w])?")
	MobilePhonePattern = regexp.MustCompile(`^1\d{10}$`)
)

// GetCheckinLinkUrl 获取用户报名签到链接
func GetCheckinLinkUrl(logger *xlog.Logger, lilliputService *lilliput.LilliputService,
	linkPrefix, activityRegId string) string {

	url := fmt.Sprintf("%s%s", linkPrefix, activityRegId)
	// 获取短链
	shortUrl, err := lilliputService.GetShortUrl(logger, url)
	if err != nil {
		logger.Errorf("GetCheckinLinkUrl lilliputService.GetShortUrl %s error: %v", url, err)
	}
	if shortUrl != "" {
		url = shortUrl
	}
	return url
}

// FormatSecTime 将秒时间戳格式化为时间字符串
func FormatSecTime(sec int64) string {
	return time.Unix(sec, 0).Format("2006-01-02")
}

func RequestRealIp(req *http.Request) (ip string, err error) {
	ip = strings.TrimSpace(strings.Split(req.Header.Get("X-Forwarded-For"), ",")[0])
	if ip != "" {
		return
	}
	ip = strings.TrimSpace(req.Header.Get("X-Real-Ip"))
	if ip != "" {
		return
	}
	ip, _, err = net.SplitHostPort(req.RemoteAddr)
	if err != nil {
		err = fmt.Errorf("SplitHostPort(%s) error: %v", req.RemoteAddr, err)
		return
	}
	return
}
