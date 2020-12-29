# 官网对外提供的可嵌入组件方案

### 外部站点嵌入使用

#### 组件渲染

外部站点的使用姿势可以参考 `test/external/index.html` 内容，引入代码如下：

```html
<script src="https://xxx/loader.js"></script>
<div id="header"></div>
<script>window.__qiniu_www_externals__.load('header', document.getElementById('header'))</script>
```

`/externals/loader.js` 会提供加载组件用的 `load` 方法，使用方使用该 `load` 方法将指定组件加载到对应的 HTML 容器中即可：

```ts
window.__qiniu_www_externals__.load(
  componentName, // 组件名，如 `header` / `footer`，对应 `externals/` 目录下的内容
  targetElement // 目标 HTML 元素，组件将被渲染到该元素中
)
```

#### 其他操作

除了被渲染到指定位置外，组件也可以定义其他接口与外部进行交互；这部分内容会被挂载在

```ts
window.__qiniu_www_externals__.components[componentName]
```

上；如通过调用

```ts
window.__qiniu_www_externals__.components['feedback-entry'].showModal()
```

可以调起用户反馈浮层

### externals 内容的生成

`externals/` 下的内容（如 `header.tsx` / `footer.tsx`）是对应的组件的入口文件，执行 `node externals.js` 会使用与 `next build` 一致的配置（稍作调整）对这些文件分别构建并输出到结果中

为了确保被嵌入的组件在外部站点的页面上也能正常运行，这里要求每个组件在被导出为 external 内容时使用 `components/Layout/External` 进行包裹，该组件提供了依赖 next.js 的组件所需要的基本的运行环境（如 `next/router`）

上边提到的加载组件用的 `loader.js` 由 `externals/loader.js` 得到，目前不会通过 babel 等工具处理，仅通过简单的正则替换来将本次构建结果的映射信息置入到内容中，确保 `loader.js` 可以得到 externals 内容准确的线上地址

### TODO

* `loader.js` 做简单的处理，包括：

    1. 压缩
    2. 基本的兼容性处理

* 考虑基于 Web Component 提供可嵌入组件，需要考虑：

    1. React 对于 shadow dom 中事件的支持问题（据说 17.x 没问题）
    2. 浏览器版本的支持

* externals 内容支持开发模式

    目前只支持直接执行 `node externals.js` 来生成 externals 内容，不支持 watch & 自动重编译