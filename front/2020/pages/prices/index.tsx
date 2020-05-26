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

const sourceMap = {
  kodo: '/prices/kodo',
  qcdn: '/prices/cdn',
  dora: '/prices/dora',
  pili: '/prices/pili',
  sms: '/prices/sms'
}

export default function Prices() {
  const [source] = useQueryValue('source', 'kodo')

  return <Redirect target={sourceMap[source]} />
}
