/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SceneType, HorizontalDetailSceneConfig } from 'components/common/www/Scene'

import { SolutionComponentName, SolutionComponentConfig, SolutionComponentProps } from './comp-common'

export type SolutionComponentSceneProps = (
  | SolutionComponentProps<HorizontalDetailSceneConfig>
  | SolutionComponentProps<SceneType.HorizontalDetail, HorizontalDetailSceneConfig>
)

export type SolutionComponentSceneConfig = SolutionComponentConfig<
  SolutionComponentName.Scene,
  SolutionComponentSceneProps
>
