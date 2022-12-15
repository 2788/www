import React from 'react'
import Redirect from 'components/Redirect'

import { Product, urlMap } from 'constants/products'

// 重定向至 /products/kodo#storage_type 页面
export default function Main() {
  const target = `${urlMap[Product.Kodo]}#storage_type`

  return <Redirect target={target} />
}
