/**
 * @file 重定向到实时音视频页面
 * @description 目标路由 /products/rtn
 * https://jira.qiniu.io/browse/BO-13189
 */

import React from 'react'

import { Product, urlMap as productUrlMap } from 'constants/products'

import Redirect from 'components/Redirect'

export default function PlayerPage() {
  return <Redirect target={productUrlMap[Product.Rtn]} />
}
