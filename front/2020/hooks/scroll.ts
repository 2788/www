/**
 * @file 滚动相关 hooks
 */

import { useState, useEffect, useCallback } from 'react'
import stickybits from 'stickybits'
import { debounce } from 'lodash'
import { isBrowser } from '../utils'

const scrollDebounceWait = 100 // ms

/** 使用当前滚动高度（通过监听滚动事件 with debounce） */
export function useScrollTop() {
  const [scrollTop, setScrollTop] = useState(0)

  const scrollTo = useCallback((top: number) => {
    getScrollContainer().scrollTo({ top })
  }, [])

  useEffect(() => {
    if (!isBrowser()) return
    const handleScroll = debounce(() => {
      setScrollTop(getScrollContainer().scrollTop)
    }, scrollDebounceWait)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return [scrollTop, scrollTo] as const
}

/**
 * 控制 HTML 元素 sticky
 * 兼容 IE & 给外部当前是否 sticky 的信息，目前只支持在 body 上滚动
 */
export function useSticky() {
  const [element, setElement] = useState<HTMLElement | null>(null)

  // 让元素 sticky
  useEffect(() => {
    if (!isBrowser() || !element) return
    const sb = stickybits(element)
    return () => sb.cleanup()
  }, [element])

  const [scrollTop] = useScrollTop()
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    if (element) {
      // 平时 scrollTop 应该小于 offsetTop，fix 住后，这俩值相等
      setIsFixed(scrollTop >= element.offsetTop)
    }
  }, [element, scrollTop])

  return [
    setElement, // elementRef
    isFixed
  ] as const
}

/** 获取滚动容器，目前只支持直接在 body 中的滚动 */
function getScrollContainer() {
  return window.document.documentElement
}
