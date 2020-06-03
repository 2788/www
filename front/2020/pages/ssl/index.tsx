/**
 * @file 重定向到ssl产品页面
 * @description 目标路由 '/product/ssl
 */

import React from 'react'

import Redirect from 'components/Redirect'

export default function SslPage() {
  const target = '/products/ssl'

  return (
    <Redirect target={target} />
  )
}
