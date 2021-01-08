package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qiniu/xlog.v1"
	"qiniu.com/www/admin-backend/codes"
	"qiniu.com/www/admin-backend/config"
	"qiniu.com/www/admin-backend/service/tbp"
)

// Consult 定义用户咨询相关接口
type Consult struct {
	conf       *config.Config
	tbpService *tbp.Service
}

// NewConsult 构造 controller Consult
func NewConsult(config *config.Config) (*Consult, error) {
	tbpService, err := tbp.NewService(
		config.Tbp.SecretId,
		config.Tbp.SecretKey,
		config.Tbp.Host,
		config.Tbp.BotId,
		config.Tbp.BotEnv,
	)
	if err != nil {
		return nil, err
	}
	return &Consult{
		conf:       config,
		tbpService: tbpService,
	}, nil
}

type textProcessInput struct {
	TerminalId string `json:"terminalId"` // 终端标识，每个终端(或线程)对应一个，区分并发多用户
	Content    string `json:"content"`
}

func (i *textProcessInput) valid() bool {
	if i.TerminalId == "" || i.Content == "" {
		return false
	}
	return true
}

// responseItem 对应一条响应，对应于 tbp 的 Group
// https://cloud.tencent.com/document/api/1060/37439#Group
// ContentType & Url 暂时用不到先不提供
type responseItem struct {
	Content string `json:"content"`
}

type textProcessOutput struct {
	// 同 tbp 对应接口返回值中的 ResultType
	// 中间逻辑出错: 0
	// 任务型机器人: 1
	// 问答型机器人: 2
	// 闲聊型机器人: 3
	// 未匹配上，返回预设兜底话术: 5
	// 未匹配上，返回相似问题列表: 6
	Type      string         `json:"type"`
	Responses []responseItem `json:"responses"`
}

// TextProcess 处理文本输入
func (consult *Consult) TextProcess(c *gin.Context) {
	logger := xlog.NewWithReq(c.Request)

	var input textProcessInput
	err := c.BindJSON(&input)
	if err != nil {
		logger.Errorf("BindJSON error: %v", err)
		SendResponse(c, codes.InvalidArgs, "bind json error")
		return
	}

	if !input.valid() {
		logger.Errorf("invalid input: %#v", input)
		SendResponse(c, codes.InvalidArgs, nil)
		return
	}

	processed, err := consult.tbpService.TextProcess(logger, input.TerminalId, input.Content)
	if err != nil {
		logger.Errorf("text process error: %v", err)
		SendResponse(c, codes.ResultError, nil)
		return
	}

	tbpResp := processed.Response

	if tbpResp.ResultType == nil {
		logger.Error("ResultType nil")
		SendResponse(c, codes.ResultError, nil)
		return
	}

	outputType := *tbpResp.ResultType

	if tbpResp.ResponseMessage == nil {
		logger.Error("ResponseMessage nil")
		SendResponse(c, codes.ResultError, nil)
		return
	}

	outputResponses := make([]responseItem, 0, len(tbpResp.ResponseMessage.GroupList))
	for _, group := range tbpResp.ResponseMessage.GroupList {
		if group != nil && group.Content != nil {
			outputResponses = append(outputResponses, responseItem{*group.Content})
		}
	}

	output := textProcessOutput{outputType, outputResponses}
	SendResponse(c, codes.OK, output)
}
