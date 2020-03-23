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
  showReactDomPatchNotification: false
})

moment.locale('zh-cn')

// 渲染 APP
const rootEl = document.getElementById('main-view-wrapper')
ReactDOM.render(
  <App />,
  rootEl
)
