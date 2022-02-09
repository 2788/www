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
  
  - `paths`: 需要刷新的内容对应的 URL path，如传入 `paths: ["/developer/foo", "/developer/foo/bar"]`，则刷新 `https://www.qiniu.com/developer/foo` & `https://www.qiniu.com/developer/foo/bar` 所对应的内容。**注意**：`paths` 中的每个 `path` 值必须以 `/` 字符开头，且 `paths` 长度限制为 `200`

* 输出

  无

* 错误返回
  - `400`：请求参数格式错误
  - `400014`：超过输入参数长度限制，长度限制为 200
  - `400015`：不合法的 `paths`，存在 `path` 没有以 `/` 字符作为开头
  - `500001`：刷新失败


#### POST /api/refresher/refresh/prefix (通过前缀进行内容刷新)

* ` Authorization ：管理员权限 Qiniu | Qbox | Bearer`

* 输入

  ```json
  {
      "prefixes": []
  }
  ```
  
  - `prefixes`: 需要刷新的内容对应的 URL path 前缀，如传入 `prefixes: ["/developer/"]`，则刷新 `https://www.qiniu.com/developer/` & `https://www.qiniu.com/developer/xxx` 一系列 URL 所对应的内容。**注意**：`prefixes` 中的每个 `prefix` 值必须以 `/` 字符开头，以 `/` 字符结尾，且 `prefixes` 长度限制为 `5`

* 输出

  无

* 错误返回
  - `400`：请求参数格式错误
  - `400016`：超过输入参数长度限制，长度限制为 5
  - `400017`：不合法的 `prefixes`，存在 `prefix` 没有以 `/` 字符作为开头与结尾
  - `500002`：前缀刷新失败
