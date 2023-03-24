/**
 * @file demo 体验
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SolutionComponentName, SolutionComponentConfig, SolutionComponentProps } from './comp-common'

export interface DemoItem {
  /** 二维码地址 */
  demoUrl: string
  /** 描述文案 */
  desc: string
}

export type SolutionComponentDemoProps = SolutionComponentProps<{
  items: DemoItem[]
}>

export type SolutionComponentDemoConfig = SolutionComponentConfig<
  SolutionComponentName.Demo,
  SolutionComponentDemoProps
>
