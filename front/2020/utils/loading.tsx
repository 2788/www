/**
 * @file loading 相关 utils
 */

import React, { ReactNode } from 'react'
import Spin from 'react-icecream/lib/spin'

export function withLoading(loading: boolean) {
  return function withSpin(content: ReactNode) {
    return <Spin spinning={loading}>{content}</Spin>
  }
}
