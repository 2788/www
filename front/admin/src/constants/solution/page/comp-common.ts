/**
 * @file 组件公共
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

export enum SolutionComponentName {
  Banner = 'Banner',
  Advantage = 'Advantage',
  Function = 'Function',
  Architecture = 'Architecture',
  Scene = 'Scene'
}

export type SolutionComponentProps<P, T extends string = 'default'> = {
  /** 组件类型 */
  type?: T
} & P

interface SolutionComponentConfigType<N extends SolutionComponentName, P, T extends string = 'default'> {
  /** 组件名称，组件被 Section 包裹 */
  name: N
  props: SolutionComponentProps<P, T>
}

export type SolutionComponentConfig<N extends SolutionComponentName, TP, P = unknown> = (
  TP extends string
  ? SolutionComponentConfigType<N, P, TP>
  : SolutionComponentConfigType<N, TP>
)
