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

可以调起用户反馈浮层。

### 开发和测试

#### externals/

`externals/` 下的内容（如 `header.tsx` / `footer.tsx`）是对应的组件的入口文件，这里会调用 `externals/help.tsx` 的 `register` 函数将组件的 `render` 函数和 `extra`（其他需要被提供出去的内容，如 `showModal`）挂载到 `window.__qiniu_www_externals__.components[componentName]`，供 `load` 调用来渲染组件或做上面提到的 “其他操作”。

确保被嵌入的组件在外部站点的页面上也能正常运行，这里要求每个组件在被导出为 external 内容时使用 `components/Layout/External` 进行包裹，该组件提供了依赖 next.js 的组件所需要的基本的运行环境（如 `next/router`）以及各种 React Context。

#### loader.js

上边提到的加载和渲染组件用的 `window.__qiniu_www_externals__.load` 由 `externals/loader.js` 得到，`load` 主要是加载对应组件的 js / css 文件并插入到页面，同时执行对应的 render 函数来渲染组件。

目前不会通过 babel 等工具处理，仅通过简单的正则替换来将本次构建结果的映射信息置入到内容中，确保 `loader.js` 可以得到 externals 内容准确的线上地址。

#### externals.js

执行 `node externals.js` 会使用与 `next build` 一致的配置（稍作调整）对 `externals/` 下的内容分别构建并输出到结果中，`externals/` 下的内容通过数组的方式配置在 `external.js` 里，每次更新  `externals/` 下的内容后应检查这里的配置是否一致。

#### 开发组件

##### 添加组件

1. 在 `externals/` 下添加新的组件，确保使用 `components/Layout/External` 进行包裹；调用 `externals/help.tsx` 的 `register` 函数挂载组件和其他需要被提供出去的内容。
2. 检查新的组件是否有新的依赖（比如 React Context），如有，确保更新  `components/Layout/External`。
3. 在 `externals.js` 里配置的 externals 列表里增加新的组件的名称。
4. 更新用于测试的 `test/external/` 下的 html 文件。

##### 删除组件

1. 删除 `externals/` 下的组件以及其他依赖的且不再用到的业务组件。
2. 删除  `components/Layout/External` 里不再用到的依赖（确保其他组件也不再依赖的）
3. 同上，更新 `externals.js`。
4. 同上，更新用于测试的 `test/external/` 下的 html 文件。

##### 测试

发到测试环境后，访问本地 `test/external/` 下的 html 文件，检查对应 external 内容渲染结果是否预期。

> 把页面上的 script 地址 http://localhost:3000/externals/loader.js 里边 localhost:3000 换成测试环境地址进行测试。

### TODO

* `loader.js` 做简单的处理，包括：

    1. 压缩
    2. 基本的兼容性处理

* 考虑基于 Web Component 提供可嵌入组件，需要考虑：

    1. React 对于 shadow dom 中事件的支持问题（据说 17.x 没问题）
    2. 浏览器版本的支持

* externals 内容支持开发模式

    目前只支持直接执行 `node externals.js` 来生成 externals 内容，不支持 watch & 自动重编译
