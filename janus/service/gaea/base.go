package gaea

type ApiResultBase struct {
	Code int    `json:"code"`
	Msg  string `json:"message"`
}

func (a *ApiResultBase) OK() bool {
	return a.Code == 200
}
