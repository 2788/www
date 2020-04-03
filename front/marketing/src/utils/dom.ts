/**
 * @file dom utils
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { throttle } from 'lodash'

export const defaultDelay = 50

// simulate MouseLeave event
export function reactionMouseLeave(target: HTMLElement, onMouseLeave: () => void) {
  if (!target || !target.contains) {
    throw new Error('Invalid target.')
  }

  const handleMouseMove = throttle((event: MouseEvent) => {
    if (event.target && !target.contains(event.target as HTMLElement) && onMouseLeave) {
      onMouseLeave()
    }
  }, defaultDelay)

  const root = document.body
  root.addEventListener('mousemove', handleMouseMove)
  return () => root.removeEventListener('mousemove', handleMouseMove)
}

export interface IDimension {
  width: number
  height: number
}

// 兼容问题很复杂，用最简单粗暴但最可靠的方法实现。。。
export const getViewportSize = (() => {
  let testEle: HTMLElement
  return (): IDimension => {
    // lazy init, init on demand
    if (!testEle) {
      testEle = document.createElement('div')

      testEle.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: transparent;
        /* z-index: -1; */
        /* opacity: 0.01; */
        /* display: none; */
      `

      document.documentElement.insertBefore(testEle, document.documentElement.firstChild)
    }

    const dimension = {
      width: testEle.offsetWidth,
      height: testEle.offsetHeight
    }

    // 不删除，随时用 TODO: 测试一下性能
    // testEle.parentNode.removeChild(testEle)
    // testEle = null

    return dimension
  }
})()

export function reactionViewportSize(onResize: (size: IDimension) => void) {
  const handleResize = throttle(() => {
    if (onResize) {
      onResize(getViewportSize())
    }
  }, defaultDelay)

  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}
