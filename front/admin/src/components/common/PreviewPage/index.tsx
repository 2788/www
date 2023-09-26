/**
 * @file 官网 iframe 预览页
 * @author zaviertang <tangzhengwei01@qiniu.com>
 */

import { debounce } from 'lodash'
import React, { useState } from 'react'
import classNames from 'classnames'
import { useLocalStore } from 'qn-fe-core/local-store'
import { LocalStorageStore } from 'qn-fe-core/storage-store'
import { AutoComplete } from 'react-icecream-2'
import { Button, InputGroup, InputGroupItem, TextInput } from 'react-icecream'
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

const localStorageKey = 'page-preview-urls'

const savePreviewUrls = debounce((storage: LocalStorageStore, newUrl: string) => {
  const previewUrls: string[] = storage.getItem(localStorageKey) || []
  previewUrls.unshift(newUrl)
  const saveUrls = Array.from(new Set(previewUrls)).slice(0, 10)
  storage.setItem(localStorageKey, saveUrls)
}, 10000)

export default function PreviewPage({ url, name, data, id, className }: Props) {
  const [previewUrl, _setPreviewUrl] = useState(url)
  const localStorage = useLocalStore(LocalStorageStore)

  const setPreviewUrl = (newUrl: string) => {
    _setPreviewUrl(newUrl)
    savePreviewUrls(localStorage, newUrl)
  }

  const fetchPreviewUrl = () => {
    const result = localStorage.getItem(localStorageKey) || []
    return result.map(v => ({ value: v, content: v }))
  }

  return (
    <div className={classNames(styles.previewPageContainer, className)}>
      <div className={styles.previewUrl}>
        <InputGroup style={{ width: '100%' }}>
          <InputGroupItem>预览地址</InputGroupItem>
          <AutoComplete
            value={previewUrl}
            fetch={fetchPreviewUrl}
            onChange={value => setPreviewUrl(value as string)}
          />
          <TextInput className={styles.input} />
        </InputGroup>
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
