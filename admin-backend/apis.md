<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [官网 admin 接口文档](#%E5%AE%98%E7%BD%91-admin-%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3)
  - [错误结构说明](#%E9%94%99%E8%AF%AF%E7%BB%93%E6%9E%84%E8%AF%B4%E6%98%8E)
  - [POST /api/refresher/refresh (内容刷新)](#post-apirefresherrefresh-%E5%86%85%E5%AE%B9%E5%88%B7%E6%96%B0)
  - [POST /api/refresher/refresh/prefix (通过前缀进行内容刷新)](#post-apirefresherrefreshprefix-%E9%80%9A%E8%BF%87%E5%89%8D%E7%BC%80%E8%BF%9B%E8%A1%8C%E5%86%85%E5%AE%B9%E5%88%B7%E6%96%B0)
  - [POST /api/refresher/fast-refresh/prefix (通过前缀进行内容刷新)](#post-apirefresherfast-refreshprefix-%E9%80%9A%E8%BF%87%E5%89%8D%E7%BC%80%E8%BF%9B%E8%A1%8C%E5%86%85%E5%AE%B9%E5%88%B7%E6%96%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
  
  - `paths`: 需要刷新的内容对应的 URL path，如传入 `paths: ["/developer/foo", "/developer/foo/bar"]`，则刷新 `https://www.qiniu.com/developer/foo` & `https://www.qiniu.com/developer/foo/` & `https://www.qiniu.com/developer/foo/bar` & `https://www.qiniu.com/developer/foo/bar/` 所对应的内容。**注意**：`paths` 中的每个 `path` 值不能以 `/` 字符结尾，且 `paths` 长度限制为 `200`

**注意**
1. 该接口会用文件名称对应的路径重新请求源站，如源站正确响应（即响应 200），则覆盖原文件内容，否则不进行任何处理
2. 因为刷新操作是异步执行，所以响应 `200` 并不等于执行完成，要确定是否执行成功可以通过 `reqid` 查询日志看到最终处理结果

* 输出

  无

* 错误返回
  - `400`：请求参数格式错误
  - `400014`：超过输入参数长度限制，长度限制为 200
  - `400015`：不合法的 `paths`，存在 `path` 以 `/` 字符作为结尾


#### POST /api/refresher/refresh/prefix (通过前缀进行内容刷新)

* ` Authorization ：管理员权限 Qiniu | Qbox | Bearer`

* 输入

  ```json
  {
      "paths": []
  }
  ```
  
  - `paths`: 需要刷新的内容对应的 URL path 前缀，如传入 `paths: ["/developer"]`，则刷新 `https://www.qiniu.com/developer` & `https://www.qiniu.com/developer/` & `https://www.qiniu.com/developer/xxx` 一系列 URL 所对应的内容。**注意**：`paths` 中的每个 `path` 值不能以 `/` 字符结尾，且 `paths` 长度限制为 `50`

**注意**
1. 该接口会用前缀获取对应的文件列表，用文件名称对应的路径重新请求源站，如源站正确响应（即响应 200），则覆盖原文件内容，否则不进行任何处理
2. 因为刷新操作是异步执行，所以响应 `200` 并不等于执行完成，要确定是否执行成功可以通过 `reqid` 查询日志看到最终处理结果

* 输出

  无

* 错误返回
  - `400`：请求参数格式错误
  - `400016`：超过输入参数长度限制，长度限制为 50
  - `400015`：不合法的 `paths`，存在 `path` 以 `/` 字符作为结尾


#### POST /api/refresher/fast-refresh/prefix (通过前缀进行内容刷新)

* 输入输出同接口 `POST /api/refresher/refresh/prefix`。区别在于 `fast-refresh` 接口会将前缀对应的空间中的所有文件删除。特点：处理速度快，但有一定的风险，如源站崩溃则会导致页面请求异常。而 `refresh` 则是用文件名称对应的路径重新请求源站，根据源站的响应做对应处理。特点：处理速度慢，但相对安全，如源站崩溃仅会导致访问到老的页面