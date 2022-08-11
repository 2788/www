import * as React from 'react'
import * as di from 'qn-fe-core/di'
import { RouterStore } from 'qn-fe-core/router'
import BaseProvider, { Props as BaseProps, createRouterStore } from 'admin-base/common/components/BootProvider'

import { RefreshClient } from 'apis/refresh'
import WwwApis from 'apis/refresh/www'
import BaseClient from 'apis/base-client'
import { MongoApiBaseClient } from 'apis/mongo-api-client'
import ActivityApis from 'apis/activity'
import GlobalBannerApis from 'apis/global-banner'
import UploadApis from 'apis/upload'
import EntityApis from 'apis/consult/entity'
import PropertyApis from 'apis/consult/property'
import ProductNewsApis from 'apis/product/news'
import ProductPageApis from 'apis/product/page'
import ProductPriceApis from 'apis/product/price'
import PgcContentApis from 'apis/pgc/content'
import PgcContentBannerApis from 'apis/pgc/content-banner'

export const defaultProvides: di.Provides = [
  { identifier: RouterStore, factory: () => createRouterStore('官网 Admin - {{routeTitle}}') },
  RefreshClient,
  WwwApis,
  BaseClient,
  MongoApiBaseClient,
  ActivityApis,
  GlobalBannerApis,
  UploadApis,
  EntityApis,
  PropertyApis,
  ProductNewsApis,
  ProductPageApis,
  ProductPriceApis,
  PgcContentApis,
  PgcContentBannerApis
]

export type Props = BaseProps

export default function Provider({ provides, ...restProps }: Props) {
  provides = di.mergeProvides(defaultProvides, provides)
  return <BaseProvider {...restProps} provides={provides} />
}
