# 运行官网所需的预先数据

## 背景

官网全局公告期望改为动态可配置的，并在构建时就预先在服务端请求好相关数据，实现类似 `getStaticProps` on components 的效果。

## 文件作用

* `produce.js`：预先执行的脚本文件，请求相关数据，并将数据塞到 json 中，需要在 `next` 或者 `next build` 之前执行 `node xxx/produce.js`；
* `data.json`：预先请求的返回数据，方便组件中去获取；
* `data.json.d.ts`：`data.json` 的类型说明文件。

## 使用姿势

* 新增额外的需要预先请求的数据：

  1. 在 `produce.js main` 方法中添加相关请求，并将 res 写到 `data.json` 中；
  2. `data.json.d.ts` 增加 `export` 语句，并根据返回数据增加具体类型；
  3. 组件中直接 `import { xxxRes } from 'hack/initial-data/data.json'` 引用并处理

* 外部组件直接使用里面数据：

  同上 3

## todo

后续优化（重构）方案：

* Next.js 后期取消 `getStaticProps` on `_app.tsx` 限制，或者提供了 `getStaticProps` on components 类似的功能，均可以改为直接使用 Next.js Api
