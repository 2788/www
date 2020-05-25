/**
 * @file 滚动相关 hooks
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import stickybits from 'stickybits'
import { MoveTo } from 'moveto'
import { debounce } from 'lodash'
import { isBrowser } from '../utils'

const defaultDebounceWait = 100 // ms
const defaultScrollDuration = 400 // 默认滚动动画时间 ms

/** 使用当前滚动高度（通过监听滚动事件 with debounce） */
export function useScrollTop(debounceWait = defaultDebounceWait) {
  const [scrollTop, setScrollTop] = useState(0)

  const syncScrollTop = useCallback(() => {
    setScrollTop(getScrollContainer().scrollTop)
  }, [])

  // 第三方库 moveto 在 module init 的时候就会尝试读 window，故它延后加载，这里存放其导出
  const MoveToRef = useRef<typeof MoveTo | undefined>()
  // 记录当前是否正在进行滚动动画，这段时间不去响应滚动事件，用于优化滚动的性能
  const scrollingRef = useRef(false)

  useEffect(() => {
    import('moveto').then(res => {
      MoveToRef.current = res.default
    })
  }, [])

  const scrollTo = useCallback((top: number, duration = defaultScrollDuration) => {
    const container = getScrollContainer()
    if (duration <= 0 || !MoveToRef.current) {
      container.scrollTo({ top })
      return
    }
    const MoveToConstr = MoveToRef.current
    const moveTo = new MoveToConstr({ duration, container })

    scrollingRef.current = true
    setTimeout(() => {
      scrollingRef.current = false
      syncScrollTop()
    }, duration)

    moveTo.move(top - container.scrollTop)
  }, [syncScrollTop])

  useEffect(() => {
    if (!isBrowser()) return
    let handleScroll = () => {
      if (scrollingRef.current) return
      syncScrollTop()
    }
    if (debounceWait > 0) {
      handleScroll = debounce(handleScroll, debounceWait)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [debounceWait, syncScrollTop])

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
    return () => { try { sb.cleanup() } catch (e) { /* do nothing */ } }
  }, [element])

  const [scrollTop] = useScrollTop(0)
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
