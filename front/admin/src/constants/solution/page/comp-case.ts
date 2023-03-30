/**
 * @file 客户案例
 * @author zzz <zhangzuzhou@qiniu.com>
 */

import { SolutionComponentProps, SolutionComponentConfig, SolutionComponentName } from './comp-common'

export interface CaseItem {
  // 客户名称
  name: string
  // 描述文案
  desc: string
  // 客户 logo 地址
  logoUrl: string
}

export type SolutionComponentCaseProps = SolutionComponentProps<{
  items: CaseItem[]
}>

export type SolutionComponentCaseConfig = SolutionComponentConfig<
  SolutionComponentName.Case,
  SolutionComponentCaseProps
>
