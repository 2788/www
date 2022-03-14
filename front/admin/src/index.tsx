import * as React from 'react'
import * as ReactDOM from 'react-dom'

import './style.less'

import App from './components/App'

// 渲染 APP
const rootEl = document.getElementById('main-view-wrapper')
ReactDOM.render(
  <App />,
  rootEl
)
