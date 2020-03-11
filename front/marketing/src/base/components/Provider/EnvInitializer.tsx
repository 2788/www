/**
 * @file Env
 * @desc admin 系统的运行环境，在这里实例化 & 初始化各种全局 store / api
 * @author nighca <nighca@live.cn>
 */

import React, { useEffect } from 'react'
import { createHistory } from 'history'
import Disposable, { IDisposable } from 'qn-fe-core/disposable'
import { injectable, useContainer, Identifier } from 'qn-fe-core/di'
import StorageStore from 'qn-fe-core/storage-store'
import { RouterStore } from 'qn-fe-core/router'

import FetchStore from '../../stores/fetch'
import Toaster from '../../stores/toaster'

export interface IEnv extends IDisposable {
  init: () => void | Promise<void>
}

export const ENV: Identifier<IEnv> = Symbol('env')

@injectable()
export class Env extends Disposable implements IEnv {

  constructor(
    // 全局 store 需要在这里声明下（在全局的 container 上做一次实例化的事情），如果这里不做
    // 具体内容组件处的 useInjection() 不会在全局的 container 里实例化对应的 store
    // 原因是 useInjection 基于 useIndividualContainer 实现
    // 为什么 useInjection 这么设计我记不太清了，不过当时没有 useLocalStore
    // 我感觉如果 local store 的注入都是通过 useLocalStore
    // 即，不会用 useInjection 去做 local store 的注入的话
    // useInjection 应该可以改成基于 useContainer 而不是 useIndividualContainer 实现
    // 所以 TODO: useInjection 改了以后这里就不用强制声明了
    public storageStore: StorageStore,
    public fetchStore: FetchStore,
    public toasterStore: Toaster,
    public routerStore: RouterStore
  ) {
    super()
  }

  init() {
    this.storageStore.bindRealStorage(window.localStorage)
    this.fetchStore.bindRealFetch(window.fetch)
    this.routerStore.bindHistory(createHistory())

    this.addDisposer(
      this.storageStore.dispose,
      this.fetchStore.dispose,
      this.toasterStore.dispose,
      this.routerStore.dispose
    )
  }
}

export interface IEnvInitializerProps {
  children: React.ReactNode
}

export default function EnvInitializer({ children }: IEnvInitializerProps) {
  // 这边不使用 useLocalStore 是因为 useLocalStore 基于 useInjection，
  // useInjection 基于 useIndividualContainer 实现，即，不会对上下文中的 container 产生影响
  const container = useContainer()
  const env = container.get(ENV)

  useEffect(() => {
    env.init()
    return env.dispose
  }, [env])

  return <>{children}</>
}
