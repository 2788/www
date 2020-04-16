/**
 * @file entry file
 * @author nighca <nighca@live.cn>
 */

import './utils/polyfills'

import 'react-hot-loader/patch'
import { setConfig } from 'react-hot-loader'
import React from 'react'
import * as ReactDOM from 'react-dom'
import { configure } from 'mobx'
import * as moment from 'moment'
import 'moment/locale/zh-cn'

import App from './components/App'

import './utils/styles/boot.less'

configure({ enforceActions: 'observed' })

setConfig({
  showReactDomPatchNotification: false,

  // TODO: hmr 有问题，比如在 `src/components/Activity/index.tsx` 里
  // hmr 的局部变更会扩大到全局范围，导致全局 DI 的重入
  // 此时全局 fetch store 的局部刷新比全局的 env 的重新加载更早发生
  // 导致 resolve 的时候全局 fetch store 已易主并重新注入成功，从而使数据无法正确传达给原调用方
  // 关闭这个选项之后，hooks 不会随着 funtional component 的代码变更而重新加载
  // 可以缓解这个问题（比如改样式不致于白屏），也能提升某些情况下的开发调试体验
  // 不良后果暂时未知（毕竟默认是开启的），可能要具体实践后才知道
  // 另外目测现在的实际效果其实也是接近于全局刷新的，比如屏幕会闪一下，fetch 也是重发了的，开发体验也不算好
  // 文档：https://github.com/gaearon/react-hot-loader#hook-support
  // 核心问题并没有解决，就是局部变更为什么会导致最外层的 env 重新加载…
  reloadHooks: false
})

moment.locale('zh-cn')

// 渲染 APP
const rootEl = document.getElementById('main-view-wrapper')
ReactDOM.render(
  <App />,
  rootEl
)
