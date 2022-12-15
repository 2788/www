import React from 'react'
import Redirect from 'components/Redirect'

import { Product } from 'constants/products'

import { urlForPrice } from 'utils/route'

// 重定向至 /prices/kodo 页面
export default function Main() {
  return <Redirect target={urlForPrice(Product.Kodo)} />
}
