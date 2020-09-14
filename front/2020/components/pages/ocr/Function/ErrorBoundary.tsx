/**
 * @file demo体验result内容出错时进行 fallback
 */

import React from 'react'

type State = {
  hasError: boolean
  error: any
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
      return <h1>&gt;_&lt; 出错了，请尝试其他图片</h1>
    }

    return this.props.children
  }
}
