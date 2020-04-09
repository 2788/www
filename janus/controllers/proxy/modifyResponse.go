package proxy

import (
	"bytes"
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
			body []byte
			err  error
			res  controllers.Response
		)
		if response.Body != nil {
			body, err = ioutil.ReadAll(response.Body)
			if err != nil {
				return err
			}
		}

		if response.StatusCode == 200 {
			res.Code = code.OK
			res.Data = json.RawMessage(string(body))
		} else {
			// 目前仅支持 grpc 与 teapots
			switch serviceProtocol {
			case config.GRPCProtocol:
				err = modifyGRPCResponse(body, &res)
			default:
				err = modifyTeaPotsResponse(body, &res)
			}
			if err != nil {
				return err
			}
		}
		newBody, err := json.Marshal(res)
		if err != nil {
			return err

		}
		err = response.Body.Close()
		if err != nil {
			return err
		}

		response.StatusCode = code.OK.Code()
		response.Body = ioutil.NopCloser(bytes.NewReader(newBody))
		return nil
	}
}

func modifyGRPCResponse(body []byte, res *controllers.Response) error {

	gErrInfo := struct {
		Error   string        `json:"error"`
		Code    gcode.Code    `json:"code"`
		Message string        `json:"message"`
		Details []interface{} `json:"details"`
	}{}

	err := json.Unmarshal(body, &gErrInfo)
	if err != nil {
		return err
	}

	// 有 order-rule 限制
	if strings.Contains(gErrInfo.Message, "validation") {
		res.Code = code.OrderRuleValidate
		res.Message = gErrInfo.Message
		return nil
	}

	res.Code = code.CodeTransform(gErrInfo.Code)
	res.Message = gErrInfo.Message

	return nil

}

func modifyTeaPotsResponse(body []byte, res *controllers.Response) error {
	err := json.Unmarshal(body, res)
	if err != nil {
		return err
	}
	// 有 order-rule 限制
	if strings.Contains(res.Message, "validation") {
		res.Code = code.OrderRuleValidate
		return nil
	}

	return nil
}
