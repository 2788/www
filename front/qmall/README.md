# Qiniu 官网商城分站

Qiniu 官网商城分站，以官网（WWW）分站的形式进行部署


## 结构

- src

`./src` 目录下保存官网活动分站代码，包括页面路由、页面 `Header`、页面 `Footer`、活动页面组件拼接逻辑等

## 开发

### 依赖

```shell
# fec-builder 版本
fec-builder --version
> 1.16.1

# qn-fe-core
v1.10.0
```

### 运行项目

项目使用 [fec-builder](https://github.com/Front-End-Engineering-Cloud/builder) 进行构建，配置文件使用的是项目根目录的 [build-config.json](./build-config.json)

使用姿势有两种：

#### npm 包（适合本地开发用）

```shell
# fec-builder 使用 npm-shrinkwrap.json 锁定依赖版本，yarn 不会识别 npm-shrinkwrap.json
# 这里请使用 npm 安装全局包
# https://www.npmjs.com/package/fec-builder
npm i fec-builder -g
# 项目目录下执行
# 安装依赖
yarn
# 启动本地服务
yarn run dev
# 本地访问地址
http://localhost:8080/marketing
# 会重定向到 http://localhost:8080/marketing/all
```

#### docker 镜像（适合持续集成环境使用）

> 镜像仓库地址：https://c.163yun.com/hub#/m/repository/?repoId=52876

```shell
docker pull hub.c.163.com/nighca/fec-builder:latest
# 项目目录下执行
docker run -v ${PWD}:/fec/input -e "BUILD_ENV=production" --rm fec-builder
```

npm 包与 docker 镜像的对比，优点：

* 不需要安装 docker，通过淘宝镜像源的话装起来应该也比 docker pull image 快
* 构建行为直接在宿主机运行，性能会比在容器中稍好，首次构建大约会快 20%

缺点：

* 没有那么可靠，安装时可能会出错（往往错在 node 构建二进制包的部分），构建行为也不能保证完全一致

更多详情可以参考 fec-builder 的项目[主页](https://github.com/Front-End-Engineering-Cloud/builder)。

### 依赖管理

依赖使用 yarn 管理，安装依赖执行 `yarn`，更新依赖执行 `yarn upgrade`。

### 静态资源

```src/static``` 文件夹中保存着项目用到的静态资源，其中

- ```iconfonts``` 文件夹保存项目用到的图标（svg 格式），svg 文件的来源为 iconfont [Ant Design 官方图标库](https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.de12df413&cid=9402)，将需要用到的 svg 文件下载到本地后，用 [icomoon](https://icomoon.io/app/#/select) 转换为字体库文件，然后在 ```src/global``` 中引入

- ```images``` 文件夹保存项目用到的图片，不要直接引用本地的图片资源，将图片上传到 bucket 中，直接引用图片的外链访问地址即可

- ```fonts``` 普通字体文件

### 关于 `src/base` 目录

- 这个是 portal-base 的**临时**替代品，具体实现几乎照抄 portal-base & admin-base，预期后面是要去掉的，所以尽量不要动里面的东西
- 主要是直接使用 portal-base 不太合适，有些东西目前又暂时不在 fe-core 里，就比较尴尬
