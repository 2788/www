package verification

import "fmt"

type operationType int

const (
	opActivityRegistration operationType = iota + 1
	opPGCFileDownload
	opPGCVideoPlay
)

func (o operationType) Humanize() string {
	switch o {
	case opActivityRegistration:
		return "活动报名"
	case opPGCFileDownload:
		return "文件下载"
	case opPGCVideoPlay:
		return "视频播放"
	default:
		return "未知操作"
	}
}

func (o operationType) String() string {
	switch o {
	case opActivityRegistration:
		return "activity_registration"
	case opPGCFileDownload:
		return "pgc_file_download"
	case opPGCVideoPlay:
		return "pgc_video_play"
	default:
		return "unknown"
	}
}

func (o operationType) Valid() bool {
	switch o {
	case opActivityRegistration, opPGCFileDownload, opPGCVideoPlay:
		return true
	default:
		return false
	}
}

func (o operationType) SMSTmplContent() string {
	return fmt.Sprintf("您正在进行%s操作，验证码：[[.Captcha]]，[[.Time]] 分钟内有效。", o.Humanize())
}
