/**
 * @file Provider for app, provides especially global stores
 * @author nighca <nighca@live.cn>
 */

import React from 'react'
import * as di from 'qn-fe-core/di'
import Disposable from 'qn-fe-core/disposable'
import BaseProvider, * as base from '../../base/components/Provider'

import FetchStore from '../../stores/fetch'

/* eslint-disable */
export * from '../../base/components/Provider'

@di.injectable()
export class Env extends Disposable implements base.IEnv {

  constructor(
    /* eslint-disable no-shadow */
    public base: base.Env,
    public fetchStore: FetchStore
  ) {
    super()
  }

  init() {
    this.base.init()
    this.fetchStore.bindRealFetch(window.fetch)

    // TODO: 考虑要不要挪到-base 的 env init 中？需要考虑具体项目定制 title 的需求
    this.base.routerStore.bindDocument(window.document, '七牛云 - {{routeTitle}}')

    this.addDisposer(
      this.base.dispose,
      this.fetchStore.dispose
    )
  }
}

export const defaultProvides: di.Provides = [
  { identifier: base.ENV, constr: Env }
]

export interface IProps extends base.IProps {}

export default function Provider({ provides, ...restProps }: IProps) {
  provides = di.mergeProvides(defaultProvides, provides)
  return <BaseProvider {...restProps} provides={provides} />
}
