/**
 * @file 神策统计相关辅助工具
 */

import { isBrowser } from 'utils'

/** 用户登录 */
export function login(uid: string) {
  if (!isBrowser()) return
  const sensors = window.sensors
  if (!sensors || typeof sensors.login !== 'function') return
  sensors.login(uid)
}

/** 埋点追踪事件 */
export function track(eventName: string, options: { [key: string]: any }) {
  if (!isBrowser()) return
  const sensors = window.sensors
  if (!sensors || typeof sensors.track !== 'function') return

  const { href, pathname } = window.location
  sensors.track(eventName, {
    $url: href,
    $url_path: pathname,
    $title: window.document.title || '',
    ...options
  })
}

/** 上报 PV */
export function pv(title: string, path: string) {
  if (!isBrowser()) return
  const sensors = window.sensors
  if (!sensors || typeof sensors.quick !== 'function') return

  sensors.quick('autoTrackSinglePage', {
    $url_path: path,
    $title: title
  })
}
