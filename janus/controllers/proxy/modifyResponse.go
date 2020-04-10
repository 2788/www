package proxy

import (
	"bytes"
	"errors"
	"io/ioutil"
	"net/http"

	"encoding/json"

	"strings"

	gcode "google.golang.org/grpc/codes"
	"qiniu.com/qbox/www/janus/code"
	"qiniu.com/qbox/www/janus/controllers"
	"qiniu.com/qbox/www/janus/env/config"
)

func ModifyResponse(serviceProtocol config.ServiceProtocol) func(*http.Response) error {
	return func(response *http.Response) error {
		var (
			err error
			res controllers.Response
		)

		// 目前仅支持 grpc 与 teapots
		switch serviceProtocol {
		case config.GRPCProtocol:
			err = modifyGRPCResponse(response, &res)
		case config.TeapotProtocol:
			err = modifyTeapotResponse(response, &res)
		default:
			return nil
		}
		if err != nil {
			return err
		}

		newBody, err := json.Marshal(res)
		if err != nil {
			return err
		}

		defer response.Body.Close()

		response.StatusCode = code.OK.Code()
		response.Body = ioutil.NopCloser(bytes.NewReader(newBody))
		response.Header.Del("Content-Length")
		return nil
	}
}

func modifyGRPCResponse(response *http.Response, res *controllers.Response) error {
	var (
		body     []byte
		err      error
		gErrInfo = struct {
			Error   string        `json:"error"`
			Code    gcode.Code    `json:"code"`
			Message string        `json:"message"`
			Details []interface{} `json:"details"`
		}{}
	)

	if response.Body != nil {
		body, err = ioutil.ReadAll(response.Body)
		if err != nil {
			return err
		}
	}
	if len(body) == 0 {
		return errors.New("response.Body is nil")
	}
	if response.StatusCode == 200 {
		res.Code = code.OK
		res.Data = json.RawMessage(string(body))
	} else {
		err = json.Unmarshal(body, &gErrInfo)
		if err != nil {
			return err
		}

		if isValidationError := transformOrderRuleResponse(res); !isValidationError {
			res.Code = code.CodeTransform(gErrInfo.Code)
			res.Message = gErrInfo.Message
		}

	}

	return nil

}

func modifyTeapotResponse(response *http.Response, res *controllers.Response) error {
	var body []byte
	var err error

	if response.Body != nil {
		body, err = ioutil.ReadAll(response.Body)
		if err != nil {
			return err
		}
	}
	if len(body) == 0 {
		return errors.New("response.Body is nil")
	}
	err = json.Unmarshal(body, res)
	if err != nil {
		return err
	}

	transformOrderRuleResponse(res)

	return nil
}

// 针对 order-rule 特殊修改 response
func transformOrderRuleResponse(res *controllers.Response) (isValidationError bool) {
	if strings.Contains(res.Message, "validation:") {
		res.Code = code.OrderRuleValidate
		fn := func(c rune) bool {
			return strings.ContainsRune("validation:", c)
		}
		res.Message = strings.TrimLeftFunc(res.Message, fn)

		return true
	}
	return false
}
