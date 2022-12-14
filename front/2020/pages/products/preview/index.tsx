/**
 * @file 产品页预览页，主要给 admin 用
 * @author tangzhengwei <tangzhengwei01@qiniu.com>
 */

import React, { useEffect, useState } from 'react'

import { getProduct } from 'constants/products'
import { isPreviewContext, usePreviewMessage } from 'utils/admin-preview'
import {
  MongoProductInfo, ProductPageInfo, hasProductPage, normalizeProductPageRelatedComponentProps, getNews
} from 'apis/admin/product'
import { getIconIdsFromJson, getIconMap } from 'apis/admin/icon-lib'
import { getGlobalBanners, GlobalBanner } from 'apis/admin/global-banners'
import { getProductPageNotices, productCodeMap } from 'apis/thallo'
import { IconMap } from 'components/LibIcon'

import ProductPage, { ProductPageProps } from '../[product]'

import styles from './style.less'

const msgKey = 'QINIU_PRODUCT_PAGE_PREVIEW'

export default function ProductPagePreview() {
  const previewData = usePreviewMessage<MongoProductInfo>(msgKey)
  const [productInfo, setProductInfo] = useState<ProductPageInfo | null>(null)
  const [iconMap, setIconMap] = useState<IconMap>({})
  const [notices, setNotices] = useState<ProductPageProps['notices']>(null)
  const [news, setNews] = useState<ProductPageProps['news']>(null)
  const [globalBanners, setGlobalBanners] = useState<GlobalBanner[]>([])

  useEffect(() => {
    if (previewData != null && hasProductPage(previewData)) {
      normalizeProductPageRelatedComponentProps(previewData).then(() => {
        setProductInfo(previewData)

        const icons = getIconIdsFromJson(previewData)
        getIconMap(icons).then(newIconMap => { setIconMap(newIconMap) })

        getGlobalBanners().then(newGlobalBanners => { setGlobalBanners(newGlobalBanners) })

        const product = getProduct(previewData.path)
        if (product != null) {
          getProductPageNotices(product as keyof typeof productCodeMap).then(
            newNotices => { setNotices(newNotices) },
            // eslint-disable-next-line no-console
            err => { console.error(err) }
          )

          getNews({ product }).then(newNews => { setNews(newNews) })
        }
      })
    } else {
      setProductInfo(null)
    }
  }, [previewData])

  if (previewData == null || productInfo == null) {
    return (<p className={styles.info}>加载中</p>)
  }

  if (!hasProductPage(previewData)) {
    return (<p className={styles.info}>请配置 banner 和最少一个模块</p>)
  }

  return (
    <isPreviewContext.Provider value>
      <ProductPage
        productInfo={productInfo}
        iconMap={iconMap}
        globalBanners={globalBanners}
        notices={notices}
        news={news}
      />
    </isPreviewContext.Provider>
  )
}
