/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Tue May 26 2020
 * @file: 拦截老页面，eg.https://www.qiniu.com/calculator
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Redirect from 'components/Redirect'
import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'

export default function Calculator() {
  return <Redirect target={urlForPrice(Product.Kodo, true)} />
}
