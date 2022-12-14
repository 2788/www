/**
 * @file 组件公共
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export enum SolutionComponentName {
  Banner = 'Banner',
  UsageGuide = 'UsageGuide',
  Advantage = 'Advantage',
  Function = 'Function',
  Architecture = 'Architecture',
  Scene = 'Scene'
}

/**
 * @example `SolutionComponentProps<XxxProps>`
 * @example `SolutionComponentProps<'xxxType', XxxProps>`
 */
export type SolutionComponentProps<TP, P = undefined> = (
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

export type SolutionComponentConfig<N extends SolutionComponentName, P> = ({
  /** 组件名称，组件被 Section 包裹 */
  name: N
  /** `SolutionComponentProps` */
  props: P
})
