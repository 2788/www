/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Sat May 09 2020
 * @file: 方案
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Project() {
  return (
    <ItemWithOverlay overlay={<Overlay />} overlayOffsetX={-134}>方案</ItemWithOverlay>
  )
}
