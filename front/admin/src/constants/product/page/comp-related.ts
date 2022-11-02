/**
 * @file 相关产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductId } from '..'
import { ProductComponentName, ProductComponentConfig } from './comp-common'

export type ProductComponentRelatedConfig = ProductComponentConfig<ProductComponentName.Related, {
  /** 分别是 3 组、4 组、6 组 */
  products: ProductId[]
}>
