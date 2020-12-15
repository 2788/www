import * as React from 'react'
import * as di from 'qn-fe-core/di'
import Disposable from 'qn-fe-core/disposable'
import BaseProvider, * as base from 'admin-base/common/components/Provider'

import FetchStore from 'stores/fetch'

export * from 'admin-base/common/components/Provider'

@di.injectable()
export class Env extends Disposable implements base.IEnv {

  constructor(
    // eslint-disable-next-line no-shadow
    public base: base.Env,
    public fetchStore: FetchStore
  ) {
    super()
  }

  init() {
    this.base.init()
    this.base.userInfoStore.fetch()
    this.base.routerStore.bindDocument(window.document, '官网 Admin - {{routeTitle}}')
    this.fetchStore.bindRealFetch(window.fetch)

    this.addDisposer(
      this.base.dispose,
      this.fetchStore.dispose
    )
  }
}

export const defaultProvides: di.Provides = [
  { identifier: base.ENV, constr: Env },
  ...base.v2provides
]

export interface IProps extends base.IProps { }

export default function Provider({ provides, ...restProps }: IProps) {
  provides = di.mergeProvides(defaultProvides, provides)
  return <BaseProvider {...restProps} provides={provides} />
}
