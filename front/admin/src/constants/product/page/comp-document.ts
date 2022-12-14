/**
 * @file 相关文档
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { ProductComponentName, ProductComponentConfig, ProductComponentProps } from './comp-common'

export interface DocumentLink {
  title: string
  url: string
}

export interface DocumentItem {
  /** 文档分类 */
  type: string
  links: DocumentLink[]
}

export type ProductComponentDocumentProps = ProductComponentProps<{
  items: DocumentItem[]
}>

export type ProductComponentDocumentConfig = ProductComponentConfig<
  ProductComponentName.Document,
  ProductComponentDocumentProps
>
