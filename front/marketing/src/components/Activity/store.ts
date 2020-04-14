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

import ComponentApis, { IListComponentsOptions, IComponentInfo } from 'apis/component'

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
    if (!list || !list.length) {
      return
    }

    this.list = list
  }

  @Loadings.handle(Loading.FetchList)
  @ToasterStore.handle()
  async fetchList() {
    const options: IListComponentsOptions = {
      code: this.props.code
    }
    const req = this.componentApis.fetchList(options)
    return req.then(this.updateList)
  }

  init() {
    // FIXME: 拆分 preview 后去掉
    if (this.props.previewData) {
      this.updateList(this.props.previewData.campaignList)
    } else {
      this.fetchList()
    }
  }
}
