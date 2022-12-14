/**
 * @file 解决方案页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 组件接口文档 https://cf.qiniu.io/pages/viewpage.action?pageId=89899012

import { SolutionComponentAdvantageConfig } from './comp-advantage'
import { SolutionComponentFunctionConfig } from './comp-function'
import { SolutionComponentArchitectureConfig } from './comp-architecture'
import { SolutionComponentSceneConfig } from './comp-scene'

export type SolutionComponent = (
  | SolutionComponentAdvantageConfig
  | SolutionComponentFunctionConfig
  | SolutionComponentArchitectureConfig
  | SolutionComponentSceneConfig
)

/** 模块 id，会用作 section 内容的 key（当前区块在可导航区域中的唯一标示），同时用作 URL hash 的值（如果有锚点） */
export enum SolutionModule {
  Banner = 'banner',
  UsageGuide = 'usage-guide',
  Advantage = 'advantage',
  Function = 'function',
  Architecture = 'architecture',
  Scene = 'scene'
}

export const solutionModuleTitleMap = {
  [SolutionModule.Banner]: '顶部 banner',
  [SolutionModule.UsageGuide]: '底部引导',
  [SolutionModule.Advantage]: '方案优势',
  [SolutionModule.Function]: '方案功能',
  [SolutionModule.Architecture]: '方案架构',
  [SolutionModule.Scene]: '应用场景'
} as const

export interface SolutionSection<T extends SolutionComponent = SolutionComponent> {
  /** section 内容的 key，当前区块在可导航区域中的唯一标示，也会用来作为 URL hash 的值 */
  name: string
  /** section 内容标题，即对应 tab 项中的文本内容 */
  title: string
  /** 组件参数 */
  component: T
}
