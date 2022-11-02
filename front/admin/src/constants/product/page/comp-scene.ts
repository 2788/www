/**
 * @file 应用场景
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductComponentName, ProductComponentConfig } from './comp-common'

export interface SceneItem {
  /** 场景名称 */
  title: string
  /** 场景描述 */
  desc: string
  imgUrl: string
}

export type ProductComponentSceneConfig = ProductComponentConfig<ProductComponentName.Scene, {
  items: SceneItem[]
}>
