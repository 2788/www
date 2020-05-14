/**
 * @file 导航模块相关工具内容
 * @description 各种类型、context 定义等
 */

import { createContext } from 'react'

/** 可导航区块信息 */
export type BlockInfo = {
  /** 内容的 key，当前区块在可导航区域中的唯一标示，也会用来作为 URL hash 的值 */
  name: string
  /** 内容标题，即对应 tab 项中的文本内容 */
  title: string
  /** 区块容器对应的 HTML 节点 */
  wrapper: HTMLElement
}

/** 注册可导航区块的函数 */
export type BlockRegisterFn = (info: BlockInfo) => void

export type ContextValue = {
  blocks: BlockInfo[]
  active: string | null
  setActive: (blockName: string) => void
  register: BlockRegisterFn
}

export const context = createContext<ContextValue | null>(null)

/** 导航栏高度 */
export const navigatorHeight = 72 // px

/** 判断 block 是否可见 */
export function isBlockInView({ wrapper: { offsetTop, offsetHeight } }: BlockInfo, scrollTop: number) {
  const viewStart = scrollTop + navigatorHeight
  return viewStart >= offsetTop && viewStart < offsetTop + offsetHeight
}
