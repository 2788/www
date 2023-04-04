import React from 'react'
import Redirect from 'components/Redirect'

import { Product, urlMap } from 'constants/products'

// 重定向至 /products/pili 页面
export default function Main() {
  return <Redirect target={urlMap[Product.Pili]} />
}
