/**
 * @file 相关产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductId } from '..'
import { ProductComponentName, ProductComponentConfig, ProductComponentProps } from './comp-common'

export type ProductComponentRelatedProps = ProductComponentProps<{
  products: ProductId[]
}>

export type ProductComponentRelatedConfig = ProductComponentConfig<
  ProductComponentName.Related,
  ProductComponentRelatedProps
>
