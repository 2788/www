/**
 * @file 回到顶部按钮
 * @desc 滚动超过一屏展示，点击回到顶部
 */

import cns from 'classnames'
import React from 'react'

import { useMobile, useViewportSize } from 'hooks/ua'
import { useScrollTop } from 'hooks/scroll'

import IconArrow from './arrow.svg'
import style from './style.less'

export default function ScrollToTop() {
  const isMobile = useMobile()
  const viewportSize = useViewportSize()
  const [scrollTop, scrollTo] = useScrollTop(0)

  if (isMobile) return null

  // 滚动超过一屏才展示
  const visible = viewportSize != null && scrollTop > viewportSize.height
  const className = cns(style.wrapper, !visible && style.hidden)

  function scrollToTop() {
    scrollTo(0)
  }

  return (
    <button className={className} type="button" title="回到顶部" onClick={scrollToTop}>
      <IconArrow />
    </button>
  )
}
