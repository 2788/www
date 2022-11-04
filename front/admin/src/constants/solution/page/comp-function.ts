/**
 * @file 方案功能
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SolutionComponentName, SolutionComponentConfig } from './comp-common'

export interface FunctionItem {
  /** 标题最多 12 字 */
  title: string
  /** 建议副标题最多 70 字 */
  desc: string
  /** 立即体验 url */
  url?: string
}

export type SolutionComponentFunctionConfig = SolutionComponentConfig<SolutionComponentName.Function, {
  /** 最多 9 组，最少 3 组。一行最多展示 3 组 */
  items: FunctionItem[]
}>
