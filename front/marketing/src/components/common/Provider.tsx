/**
 * @file Provider for app, provides especially global stores
 * @author nighca <nighca@live.cn>
 */

import React from 'react'
import sensors from 'sa-sdk-javascript'
import * as di from 'qn-fe-core/di'
import Disposable from 'qn-fe-core/disposable'
import BaseProvider, * as base from 'base/components/Provider'

import { shouldEnableSensors, shouldEnableSensorsDebugMode } from 'constants/sensors'
import { bindGA, bindSensors } from 'utils/router'

import FetchStore from 'stores/fetch'
import DemoApis from 'apis/demo'
import ComponentApis from 'apis/component'
import UserApis from 'apis/user'

import UserStore from 'stores/user'

export * from 'base/components/Provider'

@di.injectable()
export class Env extends Disposable implements base.IEnv {

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public base: base.Env,
    public fetchStore: FetchStore,
    public demoApis: DemoApis,
    public componentApis: ComponentApis,
    public userApis: UserApis,
    public userStore: UserStore
  ) {
    super()
  }

  init() {
    this.base.init()

    // TODO: 考虑要不要挪到-base 的 env init 中？需要考虑具体项目定制 title 的需求
    this.base.routerStore.bindDocument(window.document, '七牛云 - {{routeTitle}}')

    if (shouldEnableSensors) {
      if (shouldEnableSensorsDebugMode) {
        (window as any).sensors = sensors
      }

      this.addDisposer(
        bindSensors(this.base.routerStore, 'default', shouldEnableSensorsDebugMode)
      )
    }

    this.addDisposer(
      bindGA(this.base.routerStore, 'UA-40857860-16', {
        gaAddress: '//qiniu.staticfile.org/analytics.js',
        gaOptions: {
          cookieDomain: 'auto'
        }
      })
    )

    this.fetchStore.bindRealFetch(window.fetch)

    this.userStore.init()

    this.addDisposer(
      this.base.dispose,
      this.fetchStore.dispose,
      this.userStore.dispose
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
