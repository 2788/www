/**
 * @file 方案架构
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SolutionComponentName, SolutionComponentConfig, SolutionComponentProps } from './comp-common'

export type SolutionComponentArchitectureProps = SolutionComponentProps<{
  url: string
  title?: string
  alt?: string
}>

export type SolutionComponentArchitectureConfig = SolutionComponentConfig<
  SolutionComponentName.Architecture,
  SolutionComponentArchitectureProps
>
