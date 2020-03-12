/**
 * @file components' apis
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

// TODO: 依赖关系反了。。？
import { IConfig as IDemoConfig } from 'components/Activity/components/Demo'
import { IConfig as IPageBannerConfig } from 'components/Activity/components/PageBanner'
import { IConfig as ITitleBarConfig } from 'components/Activity/components/TitleBar'
import { IConfig as IPageNavConfig } from 'components/Activity/components/PageNav'

export enum ComponentName {
  Demo = 'demo',
  PageBanner = 'page-banner',
  TitleBar = 'title-bar',
  PageNav = 'page-nav'
}

export type IComponentConfig<T extends ComponentName = ComponentName> = (
  T extends ComponentName.Demo ? IDemoConfig :
  T extends ComponentName.PageBanner ? IPageBannerConfig :
  T extends ComponentName.TitleBar ? ITitleBarConfig :
  T extends ComponentName.PageNav ? IPageNavConfig :
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
  code: string // activity code
}

export interface IListComponentsResult {
  list: IComponentInfo[]
}

@injectable()
export default class ComponentApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  // TODO: 对接口
  fetchList(options: IListComponentsOptions): Promise<IListComponentsResult> {
    return this.fetchStore.get('/list-components', options)
  }
}
