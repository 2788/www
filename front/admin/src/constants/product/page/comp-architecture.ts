/**
 * @file 架构图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductComponentName, ProductComponentConfig, ProductComponentProps } from './comp-common'

export type ProductComponentArchitectureProps = ProductComponentProps<{
  url: string
  title?: string
  alt?: string
}>

export type ProductComponentArchitectureConfig = ProductComponentConfig<
  ProductComponentName.Architecture,
  ProductComponentArchitectureProps
>
