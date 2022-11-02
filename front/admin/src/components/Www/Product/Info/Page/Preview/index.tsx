/**
 * @file 预览 & 发布
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { Button } from 'react-icecream-2'
import { ShareIcon } from 'react-icecream-2/icons'

import { wwwHost } from 'constants/env'
import { ProductInfo } from 'apis/product/info'
import { useWwwPreviewMessage } from 'utils/www'

import styles from './style.m.less'

const wwwProductPreviewPageUrl = '/products/preview'
const wwwProductPreviewMsgKey = 'QINIU_PRODUCT_PAGE_PREVIEW'

export interface Props {
  productInfo: ProductInfo
}

export default function Preview({ productInfo }: Props) {
  if (!productInfo.banner || !productInfo.sections.length) {
    return (
      <div className={styles.warning}>请配置 banner 和最少一个模块。</div>
    )
  }

  return (
    <div className={styles.previewPageContainer}>
      <div className={styles.backLoading}>正在加载预览页面...</div>
      {/* 增删 section 后，预览页的 Navigator 不会更新，需重新加载预览页。 */}
      <PreviewIframe key={productInfo.sections.map(({ name }) => name).join()} productInfo={productInfo} />
    </div>
  )
}

function PreviewIframe({ productInfo }: Props) {
  const iframeRef = useWwwPreviewMessage(wwwProductPreviewMsgKey, productInfo)

  function openFullScreen() {
    const iframe = iframeRef.current
    if (iframe) {
      iframe.requestFullscreen({ navigationUI: 'show' })
    }
  }

  return (
    <>
      <Button size="small" className={styles.fullScreenBtn} icon={<ShareIcon />} onClick={openFullScreen}>全屏预览</Button>
      <iframe src={wwwHost + wwwProductPreviewPageUrl} ref={iframeRef}></iframe>
    </>
  )
}
