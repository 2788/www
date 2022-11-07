/**
 * @file 预览
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState } from 'react'
import { Button } from 'react-icecream-2'
import { ShareIcon } from 'react-icecream-2/icons'
import { Input } from 'react-icecream-1'

import { wwwHost } from 'constants/env'
import { wwwSolutionPathPrefix } from 'constants/solution'
import { SolutionInfo } from 'apis/solution'
import { useWwwPreviewMessage } from 'utils/www'

import styles from './style.m.less'

const wwwSolutionPreviewPageUrl = `${wwwSolutionPathPrefix}preview`
const wwwSolutionPreviewMsgKey = 'QINIU_SOLUTION_PAGE_PREVIEW'

export interface Props {
  solutionInfo: SolutionInfo
}

export default function Preview({ solutionInfo }: Props) {
  const [previewUrl, setPreviewUrl] = useState(wwwHost + wwwSolutionPreviewPageUrl)

  if (!solutionInfo.banner || !solutionInfo.sections.length) {
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
        key={previewUrl + solutionInfo.sections.map(({ name }) => name).join()}
        solutionInfo={solutionInfo} />
    </div>
  )
}

function PreviewIframe({ solutionInfo, previewUrl }: Props & { previewUrl: string }) {
  const iframeRef = useWwwPreviewMessage(wwwSolutionPreviewMsgKey, solutionInfo)

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
