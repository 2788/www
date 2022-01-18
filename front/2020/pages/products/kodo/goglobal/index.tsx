import React from 'react'
import Redirect from 'components/Redirect'

import { Product, urlMap } from 'constants/products'

// 老官网页面重定向至 /products/kodo 页面
export default function Main() {
  return <Redirect target={urlMap[Product.Kodo]} />
}
