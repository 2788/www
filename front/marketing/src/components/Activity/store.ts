/**
 * @file componnet renderer
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import { injectProps } from 'qn-fe-core/local-store'
import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import ComponentApis, { IComponentInfo } from 'apis/component'

import { IProps } from '.'

enum Loading {
  FetchList = 'fetchList'
}

@injectable()
export default class ActivityStore extends Store {
  constructor(
    toasteStore: ToasterStore,
    private componentApis: ComponentApis,
    @injectProps() private props: IProps
  ) {
    super()
    ToasterStore.bind(this, toasteStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @observable.ref list: IComponentInfo[] | undefined

  @action.bound
  private updateList(list: IComponentInfo[]) {
    this.list = list
  }

  @Loadings.handle(Loading.FetchList)
  @ToasterStore.handle(undefined, '控件列表数据加载失败')
  async fetchList() {
    const req = this.componentApis.fetchList({ code: this.props.code })
    req.then(result => this.updateList(result.list))
    return req
  }

  init() {
    this.fetchList()
  }
}
