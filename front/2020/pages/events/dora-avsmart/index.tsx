import React from 'react'
import Redirect from 'components/Redirect'

import { Product, urlMap } from 'constants/products'

// 老官网页面重定向至 /products/avsmart 页面
export default function Main() {
  return <Redirect target={urlMap[Product.Avsmart]} />
}
