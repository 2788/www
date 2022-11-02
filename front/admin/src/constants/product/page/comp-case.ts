/**
 * @file 客户案例 他们都在用
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductComponentName, ProductComponentConfig } from './comp-common'

export interface CaseItem {
  name: string
  logoUrl: string
}

export type ProductComponentCaseConfig = ProductComponentConfig<ProductComponentName.Case, {
  items: CaseItem[]
}>
