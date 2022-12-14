/**
 * @file 核心优势
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductComponentName, ProductComponentConfig, ProductComponentProps } from './comp-common'

export interface AdvantageItem {
  /** 标题 */
  title: string
  /** 副标题 */
  desc: string
  iconUrl: string
}

export type ProductComponentAdvantageProps = ProductComponentProps<{
  items: AdvantageItem[]
}>

export type ProductComponentAdvantageConfig = ProductComponentConfig<
  ProductComponentName.Advantage,
  ProductComponentAdvantageProps
>
