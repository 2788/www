/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Sat May 09 2020
 * @file: 方案
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { useRef } from 'react'
import Dropdown from 'components/UI/Dropdown'
import Overlay from './Overlay'

export default function Project() {
  const ref = useRef(null)
  return (
    <Dropdown
      align={{ offset: [-134, -1] }}
      getPopupContainer={() => ref.current || window.document.body}
      overlay={() => <Overlay />}
    >
      <a ref={ref}>方案</a>
    </Dropdown>
  )
}
