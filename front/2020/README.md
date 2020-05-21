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

线上 Janus 环境配置：TODO

### 构建

```shell
yarn build
```

### 发布

```shell
node deploy.js $AK $SK $BUCKET
```
