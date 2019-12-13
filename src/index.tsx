/*
 * @file entry file
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import './global/polyfill'
import 'react-hot-loader/patch'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './components/App'
import boot from './global/boot'

import './global/style.less'

// 初始化行为
boot()

// 渲染 APP
const rootEl = document.getElementById('main-view-wrapper')
ReactDOM.render(
  <App />,
  rootEl
)
