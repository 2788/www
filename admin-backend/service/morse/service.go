package morse

import (
	"bytes"
	"net/http"
	textTemplate "text/template"
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

type SendSmsIn struct {
	TmplData    interface{}
	PhoneNumber string
}

func (m *MorseService) SendSms(logger *xlog.Logger, in SendSmsIn, tmpl string) (id string, err error) {

	content, err := txtRender(in.TmplData, tmpl)
	if err != nil {
		logger.Errorf("txtRender data(%v) error: %v", in.TmplData, err)
		return
	}
	sendIn := message.SendSmsIn{
		PhoneNumber: in.PhoneNumber,
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

func (m *MorseService) BatchSendSms(logger *xlog.Logger, input []SendSmsIn,
	tmpl string) (jobId string, err error) {

	in := make([]message.SendSmsIn, 0)
	for _, item := range input {
		content, err := txtRender(item.TmplData, tmpl)
		if err != nil {
			logger.Errorf("txtRender data(%v) error: %v", item.TmplData, err)
			return jobId, err
		}
		in = append(in, message.SendSmsIn{
			PhoneNumber: item.PhoneNumber,
			Message:     content,
		})
	}
	resp, err := m.HandleNotification.BatchSendSms(logger, in)
	if err != nil {
		logger.Errorf("HandleNotification.BatchSendSms in(%+v) error: %v",
			in, err)
		return
	}
	jobId = resp.JobID
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

func txtRender(data interface{}, tmpl string) (content string, err error) {
	t, err := textTemplate.New("default").Delims("[[", "]]").Parse(tmpl)
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
