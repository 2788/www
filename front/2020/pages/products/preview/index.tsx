/**
 * @file 产品页预览页，主要给 admin 用
 * @author tangzhengwei <tangzhengwei01@qiniu.com>
 */

import React, { useEffect, useState } from 'react'

import { ProductInfo } from 'apis/admin/product'
import { usePreviewMessage } from 'hooks/admin-message'
import { getIconMap } from 'apis/admin/icon-lib'
import { IconMap } from 'components/LibIcon'
import ProductPage, { hasProductPage } from '../[product]'

const msgKey = 'QINIU_PRODUCT_PAGE_PREVIEW'

export default function ProductPagePreview() {
  const previewData = usePreviewMessage<ProductInfo>(msgKey)
  const [iconMap, setIconMap] = useState<IconMap | undefined>(undefined)

  useEffect(() => {
    getIconMap().then(setIconMap)
  }, [])

  if (!previewData) {
    return null
  }

  if (!hasProductPage(previewData)) {
    return '请配置 banner 和模块'
  }

  return (
    <ProductPage
      isPreview
      productInfo={previewData}
      iconMap={iconMap}
    />
  )
}
