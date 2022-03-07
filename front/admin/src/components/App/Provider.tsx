import * as React from 'react'
import * as di from 'qn-fe-core/di'
import { RouterStore } from 'qn-fe-core/router'
import BaseProvider, { Props as BaseProps, createRouterStore } from 'admin-base/common/components/BootProvider'

import ActivityApis from 'apis/activity'
import GlobalBannerApis from 'apis/global-banner'
import UploadApis from 'apis/upload'
import EntityApis from 'apis/consult/entity'
import PropertyApis from 'apis/consult/property'
import HomepageActivityApis from 'apis/homepage/activity'
import HomepageBannerApis from 'apis/homepage/banner'
import HomepageNewsApis from 'apis/homepage/news'
import ProductNewsApis from 'apis/product/news'
import ProductNoticeApis from 'apis/product/notice'
import ProductPageApis from 'apis/product/page'
import ProductPriceApis from 'apis/product/price'

export const defaultProvides: di.Provides = [
  { identifier: RouterStore, factory: () => createRouterStore('官网 Admin - {{routeTitle}}') },
  ActivityApis,
  GlobalBannerApis,
  UploadApis,
  EntityApis,
  PropertyApis,
  HomepageActivityApis,
  HomepageBannerApis,
  HomepageNewsApis,
  ProductNewsApis,
  ProductNoticeApis,
  ProductPageApis,
  ProductPriceApis
]

export type Props = BaseProps

export default function Provider({ provides, ...restProps }: Props) {
  provides = di.mergeProvides(defaultProvides, provides)
  return <BaseProvider {...restProps} provides={provides} />
}
