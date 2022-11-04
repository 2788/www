/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SolutionComponentName, SolutionComponentConfig } from './comp-common'

export interface SceneProblem {
  name: string
  desc: string
}

export interface SceneItem {
  /** 场景名称 */
  name: string
  /** 场景描述 */
  desc: string
  imgUrl: string
  /** 能够解决的问题 */
  problems: SceneProblem[]
}

export type SolutionComponentSceneConfig = SolutionComponentConfig<SolutionComponentName.Scene, {
  items: SceneItem[]
}>
