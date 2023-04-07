/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { SceneType, VerticalSceneConfig, HorizontalDetailSceneConfig, HorizontalSimpleSceneConfig } from 'components/common/www/Scene'

import { ProductComponentName, ProductComponentConfig, ProductComponentProps } from './comp-common'

export type ProductComponentSceneProps = (
  | ProductComponentProps<VerticalSceneConfig>
  | ProductComponentProps<SceneType.Vertical, VerticalSceneConfig>
  | ProductComponentProps<SceneType.HorizontalDetail, HorizontalDetailSceneConfig>
  | ProductComponentProps<SceneType.HorizontalSimple, HorizontalSimpleSceneConfig>
)

export type ProductComponentSceneConfig = ProductComponentConfig<
  ProductComponentName.Scene,
  ProductComponentSceneProps
>
