/**
 * @file local store of component Demo
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 参考文档：https://github.com/qbox/fe-core/tree/master/local-store

import { observable, action } from 'mobx'
import { inject, injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'

import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import DemoApis from 'apis/demo'

import { IProps } from '.'

enum Loading {
  FetchSth = 'fetchSth'
}

@injectable()
export default class DemoStore extends Store {
  constructor(
    toasterStore: ToasterStore, // 引入全局 store
    private demoApis: DemoApis, // apis 里的 fetch 也是全局 store
    @injectProps() private props: IProps, // 引入 component 的 props，使用特殊专用的 injectProps
    @inject('offset') private c: number // 普通初始化参数直接用 inject，通常是各种局部的东西
  ) {
    super()
    ToasterStore.bind(this, toasterStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @observable.ref abc: number | undefined

  @action.bound updateAbc(abc: number) {
    this.abc = abc
  }

  @Loadings.handle(Loading.FetchSth)
  @ToasterStore.handle(undefined, '获取失败')
  fetchSth() {
    const req = this.demoApis.getDemo()
    req.then(res => {
      const config = this.props.info.data
      this.updateAbc(config.a + res.b + this.c)
    })
    return req
  }

  init() {
    this.addDisposer(() => null)
    this.fetchSth()
  }
}
