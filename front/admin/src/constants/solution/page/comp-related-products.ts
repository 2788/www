/**
 * @file 相关产品
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductId } from 'constants/product'
import { SolutionComponentName, SolutionComponentConfig, SolutionComponentProps } from './comp-common'

export type SolutionComponentRelatedProductsProps = SolutionComponentProps<{
  products: ProductId[]
}>

export type SolutionComponentRelatedProductsConfig = SolutionComponentConfig<
  SolutionComponentName.RelatedProducts,
  SolutionComponentRelatedProductsProps
>
