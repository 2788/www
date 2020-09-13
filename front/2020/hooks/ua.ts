/**
 * @file 浏览器相关 hooks
 */

import { createContext, useContext } from 'react'

export type Ua = {
  isMobile?: boolean
  isMpEnv?: boolean
  loaded?: boolean
  browser?: { name?: string, version?: string }
  os?: { name?: string, version?: string }
}

export const UaContext = createContext<Ua>({})

export function useUa() {
  return useContext(UaContext)
}

export function useMp() {
  return useUa().isMpEnv || false
}

/** 获取是否移动端信息 */
export function useMobile() {
  const isMobile = useUa().isMobile
  if (isMobile == null) {
    throw new Error('Invalid isMobile value, useMobile should be used under UaContext.Provider')
  }
  return isMobile
}

/** 获取页面是否加载完成 */
export function useLoaded() {
  const loaded = useUa().loaded
  if (loaded == null) {
    throw new Error('Invalid loaded value, useLoaded should be used under UaContext.Provider')
  }
  return loaded
}

export function useBrowser() {
  const browser = useUa().browser
  if (browser == null) {
    throw new Error('Invalid browser value, useBrowser should be used under UaContext.Provider')
  }
  return browser
}

export function useOs() {
  const os = useUa().os
  if (os == null) {
    throw new Error('Invalid os value, useOs should be used under UaContext.Provider')
  }
  return os
}
