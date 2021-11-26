package verification

var NumberChars = []byte("0123456789")

type Error int

const (
	CaptchaExpiredErr Error = iota
	CaptchaIncorrectErr
	GenCaptchaTooFrequentlyErr
)

func (err Error) Error() string {
	switch err {
	case CaptchaExpiredErr:
		return "captcha is expired"
	case CaptchaIncorrectErr:
		return "captcha is incorrect"
	case GenCaptchaTooFrequentlyErr:
		return "generate captcha too frequently"
	}

	return ""
}
