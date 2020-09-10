# 官网 2020

### 工具选型

* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [Less](http://lesscss.org/) with [CSS Module](https://github.com/css-modules/css-modules)

### 开发

安装依赖

```shell
yarn
```

开始开发

```shell
yarn dev
```

打开浏览器 `http://localhost:3000` 即可

### 服务端依赖

官网依赖 Janus 作为统一的 Web API 网关，接口调用通过 Janus 转发到具体的服务；添加或修改接口通过修改 Janus 配置即可。

测试/开发环境 Janus 环境配置地址：https://spock.qiniu.io/containers/product/www/janus

线上 Janus 环境配置：咨询 @tangxuelei

### 构建

```shell
yarn build
```

### 环境

`.env` / `.env.staging` / `.env.preview` / `.env.prod` 等文件用于在不同环境下提供环境变量；

* `.env` 用于本地开发
* `.env.staging` 用于测试环境，对应 `www-2020.dev.qiniu.io`
* `.env.preview` 用于预览环境，对应 `www-2020.qiniu.com`
* `.env.prod` 用于线上环境，对应 `www.qiniu.com`

Next.js 相关文档：https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables

本地开发时 Next.js 会自动使用 `.env` 文件；

在 spock 构建时，对应于测试环境与线上环境的 Spock 任务分别会将 `.env.staging` 或 `.env.prod` 等重命名为 `.env.local`（Next.js 会优先使用之），从而实现不同环境对应不同配置

### 发布

```shell
node deploy.js $AK $SK $BUCKET
```
