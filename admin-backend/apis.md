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

官网内容的源站在某页面内容发生变更时，通过该接口主动对官网的页面缓存进行刷新，以确保终端用户可以请求到最新的内容，详情参考 https://cf.qiniu.io/pages/viewpage.action?pageId=69108775

* ` Authorization ：管理员权限 Qiniu | Qbox | Bearer`

* 输入

  ```json
  {
      "paths": []
  }
  ```
  
  - `paths`: 需要刷新的内容对应的 URL path，如传入 `paths: ["/developer/foo", "/developer/foo/bar"]`，则刷新 `https://www.qiniu.com/developer/foo` & `https://www.qiniu.com/developer/foo/bar` 所对应的内容

* 输出

  无
