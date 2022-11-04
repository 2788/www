/**
 * @file 方案架构
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SolutionComponentName, SolutionComponentConfig } from './comp-common'

export type SolutionComponentArchitectureConfig = SolutionComponentConfig<SolutionComponentName.Architecture, {
  url: string
  title?: string
  alt?: string
}>
