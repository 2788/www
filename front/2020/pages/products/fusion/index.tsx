/**
 * @file 重定向到qcdn产品页面
 * @description 目标路由 '/product/qcdn
 */

import React from 'react'

import Redirect from 'components/Redirect'

export default function FusionPage() {
  const target = '/products/qcdn'

  return (
    <Redirect target={target} />
  )
}
