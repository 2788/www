/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Thu Jun 04 2020
 * @file: 撑起最后一个 Section 的高度，以便能把最后一个滚动到顶部
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { useRef, useState } from 'react'
import useIsomorphicLayoutEffect from 'hooks/use-isomorphic-layout-effect'

export default function Empty() {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useIsomorphicLayoutEffect(() => {
    const overlayHeight = (ref.current!.offsetParent as HTMLUListElement).offsetHeight
    const previousSiblingHeight = (ref.current!.previousSibling as HTMLElement).getBoundingClientRect().height

    if (previousSiblingHeight < overlayHeight) {
      setHeight(overlayHeight - previousSiblingHeight)
    }
  }, [])

  return <div ref={ref} style={{ height }}></div>
}
