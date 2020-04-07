package proxy

import (
	"bytes"
	"io/ioutil"
	"net/http"

	"encoding/json"

	"qiniu.com/qbox/www/janus/code"
	"qiniu.com/qbox/www/janus/controllers"
	gcode "google.golang.org/grpc/codes"
)

func ModifyResponse(response *http.Response) error {
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
		gErrInfo := struct {
			Error   string        `json:"error"`
			Code    gcode.Code    `json:"code"`
			Message string        `json:"message"`
			Details []interface{} `json:"details"`
		}{}

		err = json.Unmarshal(body, &gErrInfo)
		if err != nil {
			return err
		}
		res.Code = code.CodeTransform(gErrInfo.Code)
		res.Message = gErrInfo.Message
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
