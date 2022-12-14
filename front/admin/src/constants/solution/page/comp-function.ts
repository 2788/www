/**
 * @file 方案功能
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SolutionComponentName, SolutionComponentConfig, SolutionComponentProps } from './comp-common'

export interface FunctionItem {
  /** 标题 */
  title: string
  /** 副标题 */
  desc: string
  /** 立即体验 url */
  url?: string
}

export type SolutionComponentFunctionProps = SolutionComponentProps<{
  items: FunctionItem[]
}>

export type SolutionComponentFunctionConfig = SolutionComponentConfig<
  SolutionComponentName.Function,
  SolutionComponentFunctionProps
>
