/**
 * @file 页面内容出错时进行 fallback
 */

import React, { CSSProperties } from 'react'

type State = {
  hasError: boolean
  error: any
}

const contentStyle: CSSProperties = {
  fontSize: '16px',
  fontWeight: 'normal',
  margin: '160px 0',
  textAlign: 'center'
}

export default class ErrorBoundary extends React.Component<{}, State> {

  state: State = {
    hasError: false,
    error: null // eslint-disable-line react/no-unused-state
  }

  static getDerivedStateFromError(error: any): State {
    return { hasError: true, error }
  }

  componentDidCatch() {
    // TODO: 以后这里可以上报日志
  }

  render() {
    if (this.state.hasError) {
      return <h1 style={contentStyle}>&gt;_&lt; 发生了一些错误，请刷新页面重试</h1>
    }

    return this.props.children
  }
}
