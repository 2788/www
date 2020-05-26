/**
 * @file loading 相关 utils
 */

import React, { ReactNode } from 'react'
import Loading from 'components/UI/Loading'

export function withLoading(loading: boolean) {
  return function withSpin(content: ReactNode) {
    return <Loading loading={loading}>{content}</Loading>
  }
}
