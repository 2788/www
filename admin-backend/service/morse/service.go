package morse

import (
	"bytes"
	"html/template"
	"net/http"
	"time"

	"github.com/qiniu/rpc.v1"
	"github.com/qiniu/xlog.v1"
	"qbox.us/api/message"
)

const morseClientIdKey = "Client-Id"

type MorseService struct {
	message.HandleNotification
}

func NewMorseService(host, clientId string) *MorseService {
	morseClient := &rpc.Client{
		Client: &http.Client{
			Timeout: 15 * time.Second,
			Transport: &morseTransport{
				clientID:  clientId,
				transport: http.DefaultTransport,
			},
		},
	}
	morseService := message.HandleNotification{
		Host:   host,
		Client: morseClient,
	}
	return &MorseService{morseService}
}

func (m *MorseService) SendSms(logger *xlog.Logger, phoneNumber string, tmplData interface{},
	tmpl string) (id string, err error) {

	content, err := Render(tmplData, tmpl)
	if err != nil {
		logger.Errorf("render data(%v) error: %v", tmplData, err)
		return
	}
	sendIn := message.SendSmsIn{
		PhoneNumber: phoneNumber,
		Message:     content,
	}
	resp, err := m.HandleNotification.SendSms(logger, sendIn)
	if err != nil {
		logger.Errorf("HandleNotification.SendSms phoneNumber(%s) error: %v",
			sendIn.PhoneNumber, err)
		return
	}
	id = resp.Oid
	return
}

type morseTransport struct {
	clientID  string
	transport http.RoundTripper
}

func (tr *morseTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	if tr.transport == nil {
		tr.transport = http.DefaultTransport
	}
	if req.Header.Get(morseClientIdKey) == "" {
		req.Header.Set(morseClientIdKey, tr.clientID)
	}
	return tr.transport.RoundTrip(req)
}

func Render(data interface{}, tmpl string) (content string, err error) {
	t, err := template.New("default").Delims("[[", "]]").Parse(tmpl)
	if err != nil {
		return
	}
	buff := bytes.NewBuffer(nil)
	err = t.Execute(buff, data)
	if err != nil {
		return
	}
	content = buff.String()
	return
}
