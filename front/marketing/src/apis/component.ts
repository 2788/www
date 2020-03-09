/**
 * @file component api service TODO: 对接口
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import FetchStore from 'stores/fetch'

import { IConfig as IPageBannerConfig } from 'components/PageBanner'

export enum ComponentName {
  PageBanner = 'page-banner'
}

export type IComponentConfig<T extends ComponentName = ComponentName> = (
  T extends ComponentName.PageBanner ? IPageBannerConfig :
  T
)

// TODO: 字段是否可扩展？
export type IComponentInfo<T extends ComponentName = ComponentName> = T extends ComponentName ? {
  key: string
  text: string
  valid: boolean
  value: ComponentName
  data: IComponentConfig<T>
} : never

export interface IListComponentsOptions {
  id: string
}

export interface IListComponentsResult {
  list: IComponentInfo[]
}

@injectable()
export default class ComponentApiService {
  constructor(private fetchStore: FetchStore) {}

  @observable.ref list: IComponentInfo[]

  @action private updateList(list: IComponentInfo[]) {
    this.list = list
  }

  fetchList(options: IListComponentsOptions): Promise<IListComponentsResult> {
    const req = this.fetchStore.get('/api/list-components', options).catch(_ => {
      // tslint:disable
      // TODO: mock
      return {
        list: [
          {
            "key": "test-1-page-banner-dz5GCZMS",
            "text": "落地页 banner",
            "valid": true,
            "value": "page-banner",
            "data": {
              "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583380729761&di=31b1c2a893bee0202710cbde61efad1f&imgtype=0&src=http%3A%2F%2Fpics0.baidu.com%2Ffeed%2Fa8ec8a13632762d052ead7ed8a561ffc533dc6c8.jpeg%3Ftoken%3Db650bee099c982e609f73d671593ff33%26s%3DD31038C417F88C681CF54C860300B082",
              "title": "点击查看疫情详情",
              "alt": "疫情地图",
              "link": "https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3"
            }
          }
        ]
      }
    })
    req.then(
      result => this.updateList(result.list),
      _ => alert('控件列表数据加载失败')
    )
    return req
  }
}
