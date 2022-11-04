/**
 * @file 方案优势
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SolutionComponentName, SolutionComponentConfig } from './comp-common'

export interface AdvantageItem {
  /** 标题最多 12 字 */
  title: string
  /** 副标题最多 70 字 */
  desc: string
  iconUrl: string
}

export type SolutionComponentAdvantageConfig = SolutionComponentConfig<SolutionComponentName.Advantage, {
  /** advantage 分别是 2 组、3 组、4 组、6组 */
  items: AdvantageItem[]
}>
