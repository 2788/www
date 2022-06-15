/**
 * @file DOM 操作相关 utils
 */

/**
 * 判断指定祖先节点是否包含指定的子孙节点（同 Node.prototype.contains）
 * 使用这个而不是 Node.prototype.contains 是因为后者对 IE9 支持不好
 */
export function contains(ancestor: Node, descendant: Node | null) {
  let node: Node | null = descendant
  while (node) {
    if (ancestor === node) return true
    node = node.parentNode
  }
  return false
}

// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
export function getGlobalScrollTop() {
  if (window.pageXOffset !== undefined) return window.pageYOffset
  if (document.compatMode === 'CSS1Compat') return document.documentElement.scrollTop
  return document.body.scrollTop
}

export function getScrollBarWidth() {
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

export interface ViewportSize {
  width: number
  height: number
}

// https://stackoverflow.com/a/8876069/7665569
export function getViewportSize(): ViewportSize {
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  }
}

export function getBoundingClientRect(ele: HTMLElement) {
  const rect = ele.getBoundingClientRect()
  const top = rect.top ?? rect.y
  const left = rect.left ?? rect.x
  return {
    top,
    bottom: rect.bottom ?? rect.top + rect.height,
    left,
    right: rect.right ?? rect.left + rect.width,
    width: rect.width,
    height: rect.height
  }
}

/** requestAnimationFrame */
export function raf(callback: () => void): () => void {
  if (window.requestAnimationFrame) {
    const rafId = window.requestAnimationFrame(() => { callback() })
    return () => { window.cancelAnimationFrame(rafId) }
  }

  const timerId = window.setTimeout(() => { callback() }, 1000 / 60)
  return () => { window.clearTimeout(timerId) }
}
