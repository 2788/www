/**
 * @file 产品页预览页，主要给 admin 用
 * @author tangzhengwei <tangzhengwei01@qiniu.com>
 */

import React, { useEffect, useState } from 'react'

import { isPreviewContext, usePreviewMessage } from 'utils/admin-preview'
import { ProductPageInfo, hasProductPage, normalizeProductPageRelatedComponentProps } from 'apis/admin/product'
import { getIconIdsFromJson, getIconMap } from 'apis/admin/icon-lib'
import { IconMap } from 'components/LibIcon'

import ProductPage from '../[product]'

import styles from './style.less'

const msgKey = 'QINIU_PRODUCT_PAGE_PREVIEW'

export default function ProductPagePreview() {
  const previewData = usePreviewMessage<ProductPageInfo>(msgKey)
  const [productInfo, setProductInfo] = useState<ProductPageInfo | null>(null)
  const [iconMap, setIconMap] = useState<IconMap>({})

  useEffect(() => {
    if (previewData) {
      normalizeProductPageRelatedComponentProps(previewData).then(() => {
        setProductInfo(previewData)
        const icons = getIconIdsFromJson(previewData)
        getIconMap(icons).then(setIconMap)
      })
    } else {
      setProductInfo(null)
      setIconMap({})
    }
  }, [previewData])

  if (productInfo == null) {
    return (<p className={styles.info}>加载中</p>)
  }

  if (!hasProductPage(productInfo)) {
    return (<p className={styles.info}>请配置 banner 和最少一个模块</p>)
  }

  return (
    <isPreviewContext.Provider value>
      <ProductPage
        productInfo={productInfo}
        iconMap={iconMap}
      />
    </isPreviewContext.Provider>
  )
}
