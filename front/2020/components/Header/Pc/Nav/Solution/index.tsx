/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Sat May 09 2020
 * @file: 解决方案
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Solution() {
  return (
    <ItemWithOverlay overlay={<Overlay />}>解决方案</ItemWithOverlay>
  )
}
