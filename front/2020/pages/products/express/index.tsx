/**
 * 重定向到 404，避免走缓存
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function Express() {
  return (
    <Redirect target="/404" />
  )
}
