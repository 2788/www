/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Tue May 26 2020
 * @file: 拦截老页面，eg.https://www.qiniu.com/prices?source=kodo
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { useQueryValue } from 'hooks/url'
import Redirect from 'components/Redirect'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'

const sourceMap = {
  kodo: urlForPrice(Product.Kodo),
  qcdn: urlForPrice(Product.Cdn),
  dora: urlForPrice(Product.Dora),
  pili: urlForPrice(Product.Pili),
  sms: urlForPrice(Product.Sms)
}

export default function Prices() {
  const [source] = useQueryValue('source', 'kodo')

  return <Redirect target={sourceMap[source]} />
}
