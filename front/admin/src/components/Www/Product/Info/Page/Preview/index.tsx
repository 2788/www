/**
 * @file 预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import { Button } from 'react-icecream-2'
import { ShareIcon } from 'react-icecream-2/icons'
import { Input } from 'react-icecream-1'

import { wwwHost } from 'constants/env'
import { wwwProductPathPrefix } from 'constants/product'
import { ProductInfo } from 'apis/product/info'
import { useWwwPreviewMessage } from 'utils/www'

import styles from './style.m.less'

const wwwProductPreviewPageUrl = `${wwwProductPathPrefix}preview`
const wwwProductPreviewMsgKey = 'QINIU_PRODUCT_PAGE_PREVIEW'

export interface Props {
  productInfo: ProductInfo
}

export default function Preview({ productInfo }: Props) {
  const [previewUrl, setPreviewUrl] = useState(wwwHost + wwwProductPreviewPageUrl)

  if (!productInfo.banner || !productInfo.sections.length) {
    return (
      <div className={styles.warning}>请配置 banner 和最少一个模块。</div>
    )
  }

  return (
    <div className={styles.previewPageContainer}>
      预览地址:
      <Input className={styles.previewUrl} value={previewUrl} onChange={e => { setPreviewUrl(e.target.value) }} />
      <div className={styles.backLoading}>正在加载预览页面...</div>
      {/* 增删 section 后，预览页的 Navigator 不会更新，需重新加载预览页。 */}
      <PreviewIframe
        previewUrl={previewUrl}
        key={previewUrl + productInfo.sections.map(({ name }) => name).join()}
        productInfo={productInfo} />
    </div>
  )
}

function PreviewIframe({ productInfo, previewUrl }: Props & { previewUrl: string }) {
  const iframeRef = useWwwPreviewMessage(wwwProductPreviewMsgKey, productInfo)

  function openFullScreen() {
    const iframe = iframeRef.current
    if (iframe) {
      iframe.requestFullscreen({ navigationUI: 'show' })
    }
  }

  return (
    <>
      <Button
        size="small"
        className={styles.fullScreenBtn}
        icon={<ShareIcon />}
        onClick={openFullScreen}
      >
        全屏预览
      </Button>
      <iframe src={previewUrl} ref={iframeRef}></iframe>
    </>
  )
}
