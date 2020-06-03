/**
 * @file 滚动相关 hooks
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import stickybits from 'stickybits'
import { MoveTo } from 'moveto'
import { debounce } from 'lodash'
import { isBrowser } from 'utils'
import Emitter from 'utils/emtter'

const defaultDebounceWait = 100 // ms
const defaultScrollDuration = 400 // 默认滚动动画时间 ms

// 记录当前是否正在进行滚动动画，这段时间不去响应滚动事件，用于优化滚动的性能
// 先放在这实现，以保证全局（如不同组件对于 scroll 相关 hooks 的调用）共享状态；后续考虑怎么优化
class AnimatingHolder extends Emitter {
  public value = false

  private set(value: boolean) {
    this.value = value
    this.fire()
  }

  public start(duration: number) {
    this.set(true)
    setTimeout(() => {
      this.set(false)
    }, duration + 50) // 加一点点延迟，确保动画已经完成
  }

  public onChange(fn: () => void) {
    return this.on(fn)
  }
}

const animatingHolder = new AnimatingHolder()

/** 使用当前页面滚动高度（通过监听滚动事件 with debounce） */
export function useScrollTop(debounceWait = defaultDebounceWait) {
  const [scrollTop, setScrollTop] = useState(0)

  const syncScrollTop = useCallback(() => {
    setScrollTop(getGlobalScrollTop())
  }, [])

  // 第三方库 moveto 在 module init 的时候就会尝试读 window，故它延后加载，这里存放其导出
  const MoveToRef = useRef<typeof MoveTo | undefined>()

  useEffect(() => {
    import('moveto').then(res => {
      MoveToRef.current = res.default
    })
  }, [])

  const scrollTo = useCallback((top: number, duration = defaultScrollDuration) => {
    if (duration <= 0 || !MoveToRef.current) {
      window.scroll({ top })
      return
    }
    const MoveToConstr = MoveToRef.current
    const moveTo = new MoveToConstr({ duration })

    animatingHolder.start(duration)
    // https://github.com/hsnaydd/moveTo/blob/164a7b47186282f48a4088b14d0c6fd8eb5cffef/src/moveTo.js#L157
    // Element.scroll 方法在 ie10 显示空字符串，改成从 window 调用
    moveTo.move(top - getGlobalScrollTop(), { container: window })
  }, [])

  // 页面滚动时同步 scrollTop
  useEffect(() => {
    if (!isBrowser()) return
    let handleScroll = () => {
      if (animatingHolder.value) return
      syncScrollTop()
    }
    if (debounceWait > 0) {
      handleScroll = debounce(handleScroll, debounceWait)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [debounceWait, syncScrollTop])

  // 滚动动画结束时同步 scrollTop
  useEffect(() => animatingHolder.onChange(() => {
    if (!animatingHolder.value) syncScrollTop()
  }), [syncScrollTop])

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

// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
function getGlobalScrollTop() {
  if (window.pageXOffset !== undefined) return window.pageYOffset
  if (document.compatMode === 'CSS1Compat') return document.documentElement.scrollTop
  return document.body.scrollTop
}
