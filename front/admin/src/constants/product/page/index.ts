/**
 * @file 产品页
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 组件接口文档 https://cf.qiniu.io/pages/viewpage.action?pageId=89899012

import { ProductComponentAdvantageConfig } from './comp-advantage'
import { ProductComponentFunctionConfig } from './comp-function'
import { ProductComponentArchitectureConfig } from './comp-architecture'
import { ProductComponentSceneConfig } from './comp-scene'
import { ProductComponentDocumentConfig } from './comp-document'
import { ProductComponentCaseConfig } from './comp-case'
import { ProductComponentRelatedConfig } from './comp-related'

export type ProductComponent = (
  | ProductComponentAdvantageConfig
  | ProductComponentFunctionConfig
  | ProductComponentArchitectureConfig
  | ProductComponentSceneConfig
  | ProductComponentDocumentConfig
  | ProductComponentCaseConfig
  | ProductComponentRelatedConfig
)

export enum ProductModule {
  Banner = 'banner',
  Advantage = 'advantage',
  Function = 'function',
  Architecture = 'architecture',
  Scene = 'scene',
  Document = 'document',
  Case = 'cases',
  Related = 'related'
}

export const productModuleTitleMap = {
  [ProductModule.Banner]: '顶部 banner',
  [ProductModule.Advantage]: '核心优势',
  [ProductModule.Function]: '产品功能',
  [ProductModule.Architecture]: '产品架构',
  [ProductModule.Scene]: '应用场景',
  [ProductModule.Document]: '相关文档',
  [ProductModule.Case]: '客户案例',
  [ProductModule.Related]: '相关产品'
} as const

export type ProductSection<T extends ProductComponent = ProductComponent> = T extends ProductComponent ? {
  /** section 内容的 key，当前区块在可导航区域中的唯一标示，也会用来作为 URL hash 的值 */
  name: string
  /** section 内容标题，即对应 tab 项中的文本内容 */
  title: string
  /** 组件参数 */
  component: T
} : never
