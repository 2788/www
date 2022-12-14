/**
 * @file 产品功能及服务
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductComponentName, ProductComponentConfig, ProductComponentProps } from './comp-common'

export interface FunctionItem {
  /** 标题 */
  title: string
  /** 副标题 */
  desc: string
  /** 立即体验 url */
  url?: string
}

export type ProductComponentFunctionProps = ProductComponentProps<{
  items: FunctionItem[]
}>

export type ProductComponentFunctionConfig = ProductComponentConfig<
  ProductComponentName.Function,
  ProductComponentFunctionProps
>
