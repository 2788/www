/**
 * @file 导航模块相关工具内容
 * @description 各种类型、context 定义等
 */

import { createContext } from 'react'

export type NavigatorInfo = {
  /** 导航条对应的 HTML 节点 */
  wrapper: HTMLElement
}

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
  navigator: NavigatorInfo | null
  registerNavigator(info: NavigatorInfo): void
  blocks: BlockInfo[]
  registerBlock: BlockRegisterFn
  active: string | null
  setActive: (blockName: string) => void
}

export const context = createContext<ContextValue | null>(null)

/** 导航栏高度 */
// export const navigatorHeight = 72 // px

/** 判断 block 是否可见 */
export function isBlockInView(
  { wrapper: block }: BlockInfo,
  scrollTop: number, // 当前页面的滚动高度
  offsetTop: number // 偏移量，比如吸顶 Navigator 的高度
) {
  // 因 scrollTop 是浮点值，而 offsetTop 是四舍五入的整数，所以不能直接进行两者之间的比较，故这边对 scrollTop 也进行四舍五入
  const viewStart = Math.round(scrollTop) + offsetTop
  return viewStart >= block.offsetTop && viewStart < block.offsetTop + block.offsetHeight
}
