/**
 * @file 滚动相关 hooks
 */

import { useState, useEffect, useCallback, useRef, RefObject, useMemo } from 'react'
import stickybits from 'stickybits'
import { MoveTo } from 'moveto'
import { debounce } from 'lodash'
import { isBrowser } from 'utils'
import Emitter from 'utils/emtter'
import { useBrowser, useOs } from 'hooks/ua'

import style from './style.less'

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
      // TODO: 确认下，`behavior: 'smooth'` 够靠谱的话，也许可以干掉 moveto
      window.scroll({ top, behavior: 'smooth' })
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

// 兼容的 Element.scroll. Element.scroll 在 ie 上不支持.
export function useSmoothElementScrollTo({ current }: RefObject<HTMLElement | undefined>) {
  const scrollTo = useCallback((scrollTop: number) => {
    if (current) {
      current.scrollTop = scrollTop
      return
    }

    throw Error('Its looks like you havent set an element by ref.')
  }, [current])

  useEffect(() => {
    const previousBehavior = current?.style.scrollBehavior

    if (current) {
      current.style.scrollBehavior = 'smooth'
    }
    return () => {
      if (current) {
        if (previousBehavior) {
          current.style.scrollBehavior = previousBehavior
        } else {
          delete current.style.scrollBehavior
        }
      }
    }
  }, [current])

  return scrollTo
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
  const [isFixed, setIsFixed] = useState(false)
  // useScrollTop 的方式来获取 scrollTop 时，会有 animatingHolder 延迟 scrollTop 的更新
  // 另外，这种方式来获取 scrollTop 时，都会多次 setScrollTop，所以我们直接在 useSticky 内部来监听，减少 set 操作
  useEffect(() => {
    function handleScroll() {
      if (element) {
        // 因 scrollTop 是浮点值，而 offsetTop 是四舍五入的整数，故这边比较要对 scrollTop 也进行四舍五入
        setIsFixed(Math.round(getGlobalScrollTop()) >= element.offsetTop)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [element])

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

function getScrollBarWidth() {
  const outer = document.createElement('div')
  const inner = document.createElement('div')
  outer.appendChild(inner)
  outer.style.width = '100px'
  outer.style.overflow = 'scroll'
  outer.style.position = 'absolute'
  outer.style.opacity = '0'
  document.body.appendChild(outer)
  const barWidth = outer.offsetWidth - inner.offsetWidth
  document.body.removeChild(outer)
  return barWidth
}

/** 禁用全局的滚动行为 */
export function useGlobalScroll() {
  const os = useOs()
  const browser = useBrowser()
  const [scrollWidth, setScrollWidth] = useState(0)
  useEffect(() => {
    setScrollWidth(getScrollBarWidth())
  }, [])
  function stopScroll() {
    document.body.style.paddingRight = `${scrollWidth}px`
    document.body.classList.add(style.noScroll)

    // PC 端 Safari & iOS 所有浏览器，需要给 document element 也加上 noSroll
    // 另，safari 下还会偶发地把视口定位到奇怪的位置，不过问题不大，这里就不处理了
    if (os.name === 'iOS' || browser.name === 'Safari') {
      document.documentElement.style.paddingRight = `${scrollWidth}px`
      document.documentElement.classList.add(style.noScroll)
    }
  }

  function resumeScroll() {
    document.body.style.paddingRight = 'unset'
    document.body.classList.remove(style.noScroll)
    document.documentElement.style.paddingRight = 'unset'
    document.documentElement.classList.remove(style.noScroll)
  }
  return {
    stopScroll,
    resumeScroll
  }
}

/** 禁用全局的滚动行为，用于全屏模态框的展示 */
export function useGlobalModal(visible: boolean) {
  const { stopScroll, resumeScroll } = useGlobalScroll()
  useEffect(() => {
    if (visible) {
      stopScroll()
    } else {
      resumeScroll()
    }
    return resumeScroll
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps
}

/** 检测是否出现了滚动条 */
export function useScrollable<T extends HTMLElement>(enabled = true) {
  const elementRef = useRef<T>(null)

  const [scrollableX, setScrollableX] = useState(false)
  const [scrollableY, setScrollableY] = useState(false)

  const scrollable = useMemo(() => ({
    x: scrollableX,
    y: scrollableY
  }), [scrollableX, scrollableY])

  useEffect(() => {
    if (!enabled) {
      return
    }

    // TODO: 改为比 setInterval 更好的实现
    const handleId = setInterval(() => {
      const ele = elementRef.current
      if (ele == null) {
        return
      }

      setScrollableX(ele.scrollWidth > ele.clientWidth)
      setScrollableY(ele.scrollHeight > ele.clientHeight)
    }, 200)

    return () => {
      clearInterval(handleId)
    }
  }, [enabled])

  return [scrollable, elementRef] as const
}
