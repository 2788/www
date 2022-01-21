import React from 'react'

import Redirect from 'components/Redirect'

import { urlMap, Product } from 'constants/products'

// 老官网页面重定向至 censor 页面
export default function Main() {
  return <Redirect target={urlMap[Product.Censor]} />
}
