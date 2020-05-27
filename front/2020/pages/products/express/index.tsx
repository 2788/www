/**
 * @file Pandora 2.0 (express)，重定向到 /pandora
 * @description Express 是 Pandora 产品 2.0 版本的内部代号，不对外暴露，这里保留路由
 */

import React from 'react'
import Redirect from 'components/Redirect'

export default function ExpressPage() {
  return <Redirect target="/products/pandora" />
}
