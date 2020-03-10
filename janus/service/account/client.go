package account

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/sirupsen/logrus"
)

type Client struct {
	*http.Client
}

func callRet(l logrus.FieldLogger, ret interface{}, resp *http.Response) (err error) {

	defer resp.Body.Close()

	if resp.StatusCode/100 == 2 {
		if ret != nil && resp.ContentLength != 0 {
			err = json.NewDecoder(resp.Body).Decode(ret)
			if err != nil {
				return
			}
		}
		if resp.StatusCode == http.StatusOK || resp.StatusCode == http.StatusNoContent {
			return nil
		}

	}

	body, _ := ioutil.ReadAll(resp.Body)
	err = fmt.Errorf("response status: %s, body: %s", resp.Status, string(body))
	return
}

func (s Client) GetCall(l logrus.FieldLogger, ret interface{}, url1 string, ctx ...context.Context) (err error) {
	return s.request(l, "GET", "", ret, url1, nil, ctx...)
}

func (s Client) GetCallWithForm(l logrus.FieldLogger, ret interface{}, url1 string, param map[string][]string, ctx ...context.Context) (err error) {
	payload := url.Values(param).Encode()
	if strings.ContainsRune(url1, '?') {
		url1 += "&"
	} else {
		url1 += "?"
	}
	url1 += payload

	return s.GetCall(l, ret, url1, ctx...)
}

// CallWithForm JSON Post请求，与CallWithJson重复
func (s Client) CallWithForm(l logrus.FieldLogger, ret interface{}, url1 string, data map[string][]string) (err error) {
	return s.CallWithJson(l, ret, url1, data)
}

// CallWithJson JSON Post请求
func (s Client) CallWithJson(l logrus.FieldLogger, ret interface{}, url1 string, data interface{}, ctx ...context.Context) (err error) {
	return s.request(l, "POST", "application/json", ret, url1, data, ctx...)
}

// PutWithJson JSON Put请求
func (s Client) PutWithJson(l logrus.FieldLogger, ret interface{}, url1 string, data interface{}, ctx ...context.Context) (err error) {
	return s.request(l, "PUT", "application/json", ret, url1, data, ctx...)
}

// PatchWithJson JSON Patch请求
func (s Client) PatchWithJson(l logrus.FieldLogger, ret interface{}, url1 string, data interface{}, ctx ...context.Context) (err error) {
	return s.request(l, "PATCH", "application/json", ret, url1, data, ctx...)
}

// CallWithPostForm 表单Post请求
func (s Client) CallWithPostForm(l logrus.FieldLogger, ret interface{}, url1 string, data url.Values, ctx ...context.Context) (err error) {
	return s.request(l, "POST", "application/x-www-form-urlencoded", ret, url1, data, ctx...)
}

func (s Client) request(l logrus.FieldLogger, method, contentType string, ret interface{}, url1 string, data interface{}, ctx ...context.Context) (err error) {
	var req *http.Request

	if data == nil {
		req, err = http.NewRequest(method, url1, nil)
	} else {
		if contentType == "application/json" {
			body := bytes.NewBuffer(nil)
			err = json.NewEncoder(body).Encode(data)
			if err != nil {
				return
			}

			req, err = http.NewRequest(method, url1, body)
		} else {
			switch data.(type) {
			case url.Values, map[string][]string:
				body, _ := data.(url.Values)
				req, err = http.NewRequest(method, url1, strings.NewReader(body.Encode()))
			default:
				err = errors.New("body type mismatch")
			}
		}
	}

	if err != nil {
		return
	}

	if contentType != "" {
		req.Header.Set("Content-Type", contentType)
	}

	if len(ctx) > 0 && ctx[0] != nil {
		req = req.WithContext(ctx[0])
	}

	resp, err := s.Do(req)
	if err != nil {
		return
	}

	return callRet(l, ret, resp)
}
