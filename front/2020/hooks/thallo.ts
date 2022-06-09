/**
 * @file Thallo related hooks
 * @desc 广告投放平台相关工具 hooks
 */

import { useState, useEffect } from 'react'

import { AdvertInfo } from 'apis/thallo'
import { isBrowser } from 'utils'
import { trackShow, trackClick } from 'utils/sensors/thallo'

type VisibilityChangeCallback = (visible: boolean) => void

// 基于 IntersectionObserver 的简单封装
// 1. 方便多个 element 复用单个 IntersectionObserver 实例
// 2. 封装广告位的 visibility 判定逻辑
// 3. 屏蔽 browser / SSG 的不同逻辑
class VisibilityObserver {

  private observings = this.createObservings()

  private createObservings() {
    if (typeof WeakMap === 'undefined') return
    return new WeakMap<Element, VisibilityChangeCallback>()
  }

  intersectionObserver = this.createIntersectionObserver()

  private createIntersectionObserver() {
    if (!isBrowser()) return
    if (typeof IntersectionObserver === 'undefined') return
    // 使用默认 options，即，observe target 任意部位可见都认为可见
    return new IntersectionObserver(this.intersectionObserverCallback.bind(this))
  }

  private intersectionObserverCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      const callback = this.observings?.get(entry.target)
      if (callback) callback(entry.isIntersecting)
    })
  }

  /**
   * 注意：不支持对同一个 target observe 多次
   * （之前的 callback 会被覆盖，这对于广告位上报的场景够用了）
   */
  observe(target: Element, callback: VisibilityChangeCallback) {
    if (!this.intersectionObserver || !this.observings) return
    this.observings.set(target, callback)
    this.intersectionObserver.observe(target)
  }

  stopObserve(target: Element) {
    if (!this.intersectionObserver || !this.observings) return
    this.observings.delete(target)
    this.intersectionObserver.unobserve(target)
  }

}

const visibilityObserver = new VisibilityObserver()

/**
 * 指定广告位是否可见（任意部位可见认为可见）
 * 注意一个元素只可以被 observe 一次（详见 VisibilityObserver 实现）
 */
function useVisible(target: Element | null) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (target == null) return
    visibilityObserver.observe(target, setVisible)
    return () => visibilityObserver.stopObserve(target)
  }, [target])
  return visible
}

/** 指定广告投放对应的元素，当其可见时上报 */
export function useTrackShow(target: Element | null, advertInfo: AdvertInfo) {
  // 单个广告位一次 PV 中最多上报一次展示事件，这里记录下上报过的广告位
  const [reported] = useState(() => new Set<string>())
  const visible = useVisible(target)
  useEffect(() => {
    if (!visible) return
    if (reported.has(advertInfo.code)) return
    reported.add(advertInfo.code)
    trackShow(advertInfo)
  }, [visible, advertInfo, reported])
}

/** 指定广告投放对应的元素，当其被点击时上报 */
export function useTrackClick(target: Element | null, advertInfo: AdvertInfo) {
  useEffect(() => {
    if (target == null) return
    const handleClick = () => {
      trackClick(advertInfo)
    }
    target.addEventListener('click', handleClick)
    return () => target.removeEventListener('click', handleClick)
  }, [target, advertInfo])
}

/** 指定广告投放对应的元素，当其展示或被点击时上报 */
export function useTrack(target: Element | null, advertInfo: AdvertInfo) {
  useTrackShow(target, advertInfo)
  useTrackClick(target, advertInfo)
}
