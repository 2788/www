/**
 * @file 使用场景组件相关工具内容
 * @description 各种类型、context 定义等
 */

import { ReactNode, createContext } from 'react'

/** 可切换 panel 区块信息 */
export type PanelInfo = {
  /** 内容的 key，当前区块在可切换 panel 中的唯一标识 */
  name: string
  /** 内容标题，即对应 panel 标题的文本内容 */
  title: string
  /** 可选传参，panel 对应的 node 节点 */
  node?: ReactNode
}

/** 注册可切换 panel 区块的函数 */
export type PanelRegisterFn = (info: PanelInfo) => void

export type ContextValue = {
  panels: PanelInfo[]
  active: string | null
  setActive: (panelName: string) => void
  register: PanelRegisterFn
}

export const context = createContext<ContextValue | null>(null)
