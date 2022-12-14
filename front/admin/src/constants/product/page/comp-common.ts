/**
 * @file 组件公共
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export enum ProductComponentName {
  Banner = 'Banner',
  UsageGuide = 'UsageGuide',
  News = 'News',
  Advantage = 'Advantage',
  Function = 'Function',
  Architecture = 'Architecture',
  Scene = 'Scene',
  Document = 'Documentation',
  Case = 'Case',
  Related = 'Related'
}

/**
 * @example `ProductComponentProps<XxxProps>`
 * @example `ProductComponentProps<'xxxType', XxxProps>`
 */
export type ProductComponentProps<TP, P = undefined> = (
  P extends undefined ? (
    {
      /** 组件默认类型 */
      type: 'default'
    } & TP
  ) : TP extends string ? (
    {
      /** 组件类型 */
      type: TP
    } & P
  ) : never
)

export type ProductComponentConfig<N extends ProductComponentName, P> = ({
  /** 组件名称，组件被 Section 包裹 */
  name: N
  /** `ProductComponentProps` */
  props: P
})
