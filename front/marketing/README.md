# Qiniu 官网市场活动站点

Qiniu 官网活动页面

```shell
# 线上访问域名
https://marketing.qiniu.com/activity

# 测试环境访问域名
http://marketing.dev.qiniu.io/activity
```

根据后端返回的活动配置信息渲染活动页面，运营同学通过配置活动信息就可以对活动页面进行实时的修改

## 结构

- src

`./src` 目录下保存官网活动站点代码，包括页面路由、页面 `Header`、页面 `Footer`、活动页面组件拼接逻辑等

## 开发

### IDE

如果使用 `vscode` 的话建议安装一个 `css module` 插件如 `clinyong.vscode-css-modules`

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
http://localhost:8080/activity
# 会重定向到 http://localhost:8080/activity/all
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

### 楼层组件结构

- 参考 `src/components/Activity/components` 里的 `Demo`，比较自由、没什么约束

- 新加组件需要在 `src/components/Activity/index.tsx` 和 `src/apis/component.ts` 里注册一下

- TODO: 长远来说，这些组件不应该直接属于 `components/Activity`，而应该属于 `components/common`

### 关于 `src/base` 目录

- 这个是 portal-base 的**临时**替代品，具体实现几乎照抄 portal-base & admin-base，预期后面是要去掉的，所以尽量不要动里面的东西
- 主要是直接使用 portal-base 不太合适，有些东西目前又暂时不在 fe-core 里，就比较尴尬

### deploy 流程 TODO

1. 更新了代码库
2. 触发发布事件，可以是 merge 或打 tag 自动触发，也可以是人工操作；需要区分线上和线下环境
3. build 整个项目（包括所有组件和 renderer），产物上传 cdn
4. 拿到 cdn 地址，上报后端，代码库发布完成
5. 编辑器（portal.io）只使用最新发布的代码库版本
6. 因此编辑器每当发布一个活动页的时候，会把当前活动页跟当前最新版的代码库绑定
7. 但是在下次重新发布之前，这个版本会维持稳定，直到下一次重新编辑（因此更新代码库不会直接影响已发布的活动页）
8. 因此如果考虑到某些活动页不是一次性的（而是会重新经过编辑器维护、修改的），那么组件、编辑器、配置等在升级的过程中要尽量做到**兼容**，不兼容就新增一个组件
9. 重新发布一个已有活动页的时候，如果代码库更新了，给用户的 url 是否需要维持不变。。？

### TODO: UT
