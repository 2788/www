/**
 * @file Provider for DI container
 * @desc 提供 admin 系统运行的环境的 Provider，主要是各种全局 store
 * @author nighca <nighca@live.cn>
 */

import React from 'react'
import * as di from 'qn-fe-core/di'
import EnvInitializer, { ENV, Env } from './EnvInitializer'

export * from './EnvInitializer'

export interface IProps extends di.IProviderProps {}

// TODO: 考虑是不是单独挪出去
// defaultProvides -> constants
// createContainer -> utils
export const defaultProvides: di.Provides = [
  // 这里预期以后会放一些为了把 app 跑起来需要提供的基础内容
  // 如 fetch store 依赖的 real fetch、storage store 依赖的 real storage、now 等
  // 那样到时候 EnvInitializer 里的很多逻辑就不太需要了
  { identifier: ENV, constr: Env }
]

export default function Provider({ children, provides, ...restProps }: IProps) {
  provides = di.mergeProvides(defaultProvides, provides)
  return (
    <di.Provider {...restProps} provides={provides}>
      <EnvInitializer>
        {children}
      </EnvInitializer>
    </di.Provider>
  )
}
