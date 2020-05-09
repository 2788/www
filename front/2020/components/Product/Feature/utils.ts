/**
 * @file 产品页功能与优势组件相关工具内容
 * @description 各种类型、context 定义等
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { createContext } from 'react'

/** 跳转链接信息 */
export type LinkInfo = {
  /** 链接跳转地址 */
  href: string
}

/** 跳转链接的函数 */
export type LinkRegisterFn = (info: LinkInfo) => void

export type ContextValue = {
  register: LinkRegisterFn
}

export const context = createContext<ContextValue | null>(null)
