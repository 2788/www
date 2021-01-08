package tbp

import (
	"github.com/qiniu/xlog.v1"

	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/profile"
	tbp "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/tbp/v20190627"
)

// Service 封装对于腾讯智能对话平台（tbp）接口的操作逻辑
// 接口文档 https://cloud.tencent.com/document/product/1060/37438
// 接口调试 https://console.cloud.tencent.com/api/explorer?Product=tbp&Version=2019-06-27&Action=TextProcess&SignVersion=
type Service struct {
	client *tbp.Client
	botId  string
	botEnv string
}

// NewService 构造 tbp service
func NewService(secretId, secretKey, host, botId, botEnv string) (s *Service, err error) {
	credential := common.NewCredential(secretId, secretKey)
	cpf := profile.NewClientProfile()
	cpf.HttpProfile.Endpoint = host
	client, err := tbp.NewClient(credential, "", cpf)
	if err != nil {
		return
	}

	s = &Service{
		client: client,
		botId:  botId,
		botEnv: botEnv,
	}
	return
}

// TextProcess 用于对文本输入进行处理
func (s *Service) TextProcess(logger *xlog.Logger, terminalId, inputText string) (resp *tbp.TextProcessResponse, err error) {
	request := tbp.NewTextProcessRequest()

	request.BotId = common.StringPtr(s.botId)
	request.BotEnv = common.StringPtr(s.botEnv)
	request.TerminalId = common.StringPtr(terminalId)
	request.InputText = common.StringPtr(inputText)

	resp, err = s.client.TextProcess(request)
	if err != nil {
		logger.Errorf("call tbp api error: %v", err)
		return
	}
	return
}
