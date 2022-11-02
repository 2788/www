/**
 * @file 组件公共
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export enum ProductComponentName {
  Banner = 'Banner',
  Advantage = 'Advantage',
  Function = 'Function',
  Architecture = 'Architecture',
  Scene = 'Scene',
  Document = 'Documentation',
  Case = 'Case',
  Related = 'Related'
}

export type ProductComponentProps<P, T extends string = 'default'> = {
  /** 组件类型 */
  type?: T
} & P

interface ProductComponentConfigType<N extends ProductComponentName, P, T extends string = 'default'> {
  /** 组件名称，组件被 Section 包裹 */
  name: N
  props: ProductComponentProps<P, T>
}

export type ProductComponentConfig<N extends ProductComponentName, TP, P = unknown> = (
  TP extends string
  ? ProductComponentConfigType<N, P, TP>
  : ProductComponentConfigType<N, TP>
)
