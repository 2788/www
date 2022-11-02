/**
 * @file 架构图
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductComponentName, ProductComponentConfig } from './comp-common'

export type ProductComponentArchitectureConfig = ProductComponentConfig<ProductComponentName.Architecture, {
  url: string
  title?: string
  alt?: string
}>
