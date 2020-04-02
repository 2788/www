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
    private toasteStore: ToasterStore,
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

  @action.bound parseStrToJson(str: string) {
    try {
      const list: IComponentInfo[] = JSON.parse(str)
      this.updateList(list)
    } catch (error) {
      this.toasteStore.error('控件列表数据解析失败')
    }
  }

  @Loadings.handle(Loading.FetchList)
  @ToasterStore.handle(undefined, '控件列表数据加载失败')
  async fetchList() {
    const options: IListComponentsOptions = {
      code: this.props.code
    }
    const req = this.componentApis.fetchList(options)
    req.then(action((res: string) => {
      this.parseStrToJson(res)
    }))
    return req
  }

  init() {
    this.fetchList()
  }
}
