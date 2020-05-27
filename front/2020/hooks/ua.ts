/**
 * @file 浏览器相关 hooks
 */

import { createContext, useContext } from 'react'

export type Ua = {
  isMobile?: boolean
}

export const UaContext = createContext<Ua>({})

export function useUa() {
  return useContext(UaContext)
}

/** 获取是否移动端信息 */
export function useMobile() {
  return useUa().isMobile || false
}
