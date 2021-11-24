package utils

import (
	"fmt"
	"time"

	"github.com/qiniu/xlog.v1"

	"qiniu.com/www/admin-backend/service/lilliput"
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
