/**
 * @file 官网 iframe 预览页
 * @author zaviertang <tangzhengwei01@qiniu.com>
 */

import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { Button, TextInput } from 'react-icecream'
import { ShareIcon } from 'react-icecream/icons'

import { useWwwPreviewMessage } from 'utils/www'

import styles from './style.m.less'

interface MetaProps {
  /** 官网预览页地址 */
  url: string
  /** 官网预览页接收数据名称 */
  name: string
  /** 官网预览页接收数据内容 */
  data: any
}

function PreviewIframe({ url, name, data }: Props) {
  const iframeRef = useWwwPreviewMessage(name, data)

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
      <iframe src={url} ref={iframeRef}></iframe>
    </>
  )
}

export interface Props extends MetaProps {
  /** 官网预览页唯一标识（发生变更能触发 iframe 重新加载） */
  id?: string
  className?: string
}

export default function PreviewPage({ url, name, data, id, className }: Props) {
  const [previewUrl, setPreviewUrl] = useState(url)

  useEffect(() => {
    setPreviewUrl(url)
  }, [url])

  return (
    <div className={classNames(styles.previewPageContainer, className)}>
      <div className={styles.previewUrl}>
        预览地址:
        <TextInput className={styles.input} value={previewUrl} onChange={value => { setPreviewUrl(value) }} />
      </div>
      <div className={styles.backLoading}>正在加载预览页面...</div>
      <PreviewIframe
        url={previewUrl}
        key={`[${previewUrl}] ${id ?? ''}`}
        name={name}
        data={data}
      />
    </div>
  )
}
