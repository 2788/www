/**
 * @file components' apis
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

import { proxyLego } from 'constants/proxy'

// FIXME: 依赖关系反了。。？
import { IConfig as IDemoConfig } from 'components/Activity/components/Demo'
import { IConfig as IPageBannerConfig } from 'components/Activity/components/PageBanner'
import { IConfig as ITitleBarConfig } from 'components/Activity/components/TitleBar'
import { IConfig as IPageNavConfig } from 'components/Activity/components/PageNav'
import { IConfig as IRichTextConfig } from 'components/Activity/components/RichText'
import { IConfig as ICouponContainerConfig } from 'components/Activity/components/CouponContainer'
import { IConfig as IPackageContainerConfig } from 'components/Activity/components/PackageContainer'

export enum ComponentName {
  Demo = 'demo',
  PageBanner = 'page-banner',
  TitleBar = 'title-bar',
  PageNav = 'page-nav',
  RichText = 'rich-text-editor',
  CouponContainer = 'coupon-container',
  PackageContainer = 'package-container'
}

export type IComponentConfig<T extends ComponentName = ComponentName> = (
  T extends ComponentName.Demo ? IDemoConfig :
  T extends ComponentName.PageBanner ? IPageBannerConfig :
  T extends ComponentName.TitleBar ? ITitleBarConfig :
  T extends ComponentName.PageNav ? IPageNavConfig :
  T extends ComponentName.RichText ? IRichTextConfig :
  T extends ComponentName.CouponContainer ? ICouponContainerConfig :
  T extends ComponentName.PackageContainer ? IPackageContainerConfig :
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

@injectable()
export default class ComponentApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  fetchList(options: IListComponentsOptions): Promise<IComponentInfo[]> {
    return this.fetchStore.get(`${proxyLego}/campaigns/pages/config/by/campaign`, options).then((res: string) => {
      try {
        const list: IComponentInfo[] = JSON.parse(res)
        return list
        // return (res as any).list
      } catch (error) {
        throw new Error('控件列表数据解析失败')
      }
    }, (_err) => {
      throw new Error('控件列表数据加载失败')
    })
  }
}
