import './global/polyfill'
import 'react-hot-loader/patch'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { configure } from 'mobx'

// https://github.com/mobxjs/mobx-react-lite#observer-batching
// mobx-react-lite 升级到 2.2+ 后不再需要
import 'mobx-react-lite/batchingForReactDom'

import App from './components/App'

import './global/style.less'

configure({ enforceActions: 'observed' })

// 渲染 APP
const rootEl = document.getElementById('main-view-wrapper')
ReactDOM.render(
  <App />,
  rootEl
)
