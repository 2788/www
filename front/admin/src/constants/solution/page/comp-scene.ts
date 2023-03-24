/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SceneType, HorizontalDetailSceneConfig, VerticalSceneConfig } from 'components/common/www/Scene'

import { SolutionComponentName, SolutionComponentConfig, SolutionComponentProps } from './comp-common'

export type SolutionComponentSceneProps = (
  | SolutionComponentProps<HorizontalDetailSceneConfig>
  | SolutionComponentProps<SceneType.HorizontalDetail, HorizontalDetailSceneConfig>
  | SolutionComponentProps<SceneType.Vertical, VerticalSceneConfig>
)

export type SolutionComponentSceneConfig = SolutionComponentConfig<
  SolutionComponentName.Scene,
  SolutionComponentSceneProps
>
