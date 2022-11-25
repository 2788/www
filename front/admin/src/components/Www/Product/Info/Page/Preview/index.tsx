/**
 * @file 预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useMemo } from 'react'

import { wwwHost } from 'constants/env'
import { wwwProductPathPrefix } from 'constants/product'
import { ProductInfo } from 'apis/product/info'
import { hasProductPage } from 'transforms/product/info'
import PreviewPage from 'components/common/PreviewPage'

import styles from './style.m.less'

const wwwProductPreviewPageUrl = `${wwwProductPathPrefix}preview`
const wwwProductPreviewMsgKey = 'QINIU_PRODUCT_PAGE_PREVIEW'

export interface Props {
  productInfo: ProductInfo
}

export default function Preview({ productInfo }: Props) {
  // 增删 section 后，预览页的 Navigator 不会更新，需重新加载预览页。
  const refreshId = useMemo(
    () => productInfo.sections.map(({ name }) => name).join(', '),
    [productInfo]
  )

  if (!hasProductPage(productInfo)) {
    return (
      <div className={styles.warning}>请配置 banner 和最少一个模块。</div>
    )
  }

  return (
    <PreviewPage
      url={wwwHost + wwwProductPreviewPageUrl}
      name={wwwProductPreviewMsgKey}
      data={productInfo}
      id={refreshId}
    />
  )
}
