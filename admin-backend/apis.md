### 官网 admin 接口文档

* 线上地址：https://www-admin.qiniu.io
* 测试环境地址：http://admin-backend-www-env-staging.qa.qiniu.io


#### 错误结构说明

```go
type ErrorBody struct {
	Code    int    `json:"code"`
	Message string `json:"message,omitempty"`
}

// 举例：错误 code 为 `400` 时， ErrorBody 中 code = 400,  message = "invalid args"
// 返回错误 code 为 `400014` 时，对应响应 http code 为高三位，即 400，ErrorBody 中 code = 400014
```


#### POST /api/refresher/refresh (内容刷新)

* ` Authorization ：管理员权限 Qiniu | Qbox | Bearer`

* 输入

  ```json
  {
      "paths": []
  }
  ```