/**
 * @file component api service TODO: 对接口
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import ToasterStore from 'base/stores/toaster'
import FetchStore from 'stores/fetch'

import { IConfig as IDemoConfig } from 'components/Demo'
import { IConfig as IPageBannerConfig } from 'components/PageBanner'

export enum ComponentName {
  Demo = 'demo',
  PageBanner = 'page-banner'
}

export type IComponentConfig<T extends ComponentName = ComponentName> = (
  T extends ComponentName.Demo ? IDemoConfig :
  T extends ComponentName.PageBanner ? IPageBannerConfig :
  T
)

export type IComponentInfo<T extends ComponentName = ComponentName> = T extends ComponentName ? {
  key: string
  text: string
  valid: boolean
  value: T
  data: IComponentConfig<T>
} : never

export interface IListComponentsOptions {
  activityCode: string
}

export interface IListComponentsResult {
  list: IComponentInfo[]
}

@injectable()
export default class ComponentApiService extends Store {
  constructor(
    private fetchStore: FetchStore,
    toasteStore: ToasterStore
  ) {
    super()
    ToasterStore.bind(this, toasteStore)
  }

  @observable.ref list: IComponentInfo[] | undefined

  @action private updateList(list: IComponentInfo[]) {
    this.list = list
  }

  @ToasterStore.handle(undefined, '控件列表数据加载失败')
  fetchList(options: IListComponentsOptions): Promise<IListComponentsResult> {
    const req = this.fetchStore.get('/list-components', options)
    req.then(result => this.updateList(result.list))
    return req
  }
}
