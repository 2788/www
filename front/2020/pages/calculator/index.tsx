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

export default function Calculator() {
  return <Redirect target="/prices/kodo?tab=calc" />
}
