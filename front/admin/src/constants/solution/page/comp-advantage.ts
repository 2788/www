/**
 * @file 方案优势
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SolutionComponentName, SolutionComponentConfig, SolutionComponentProps } from './comp-common'

export interface AdvantageItem {
  /** 标题 */
  title: string
  /** 副标题 */
  desc: string
  iconUrl: string
}

export type SolutionComponentAdvantageProps = SolutionComponentProps<{
  items: AdvantageItem[]
}>

export type SolutionComponentAdvantageConfig = SolutionComponentConfig<
  SolutionComponentName.Advantage,
  SolutionComponentAdvantageProps
>
