/**
 * @file 浏览器相关 hooks
 */

import { createContext, useContext } from 'react'

export type Ua = {
  isMobile?: boolean
  loaded?: boolean
}

export const UaContext = createContext<Ua>({})

export function useUa() {
  return useContext(UaContext)
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
