/**
 * @file 内容详情预览页，主要给 admin 用
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'

import { ContentType, ContentDetail } from 'constants/pgc/content'
import { mdTextToHTMLAst, AstRootNode } from 'components/pgc/content/Article'

import Detail from '../[id]'

const msgKey = 'QINIU_PGC_CONTENT_DETAIL_PREVIEW'

interface WwwPreview {
  type: ContentType
  contentDetail: ContentDetail
  createdAt?: number
  editPagePrefix: string
}

export default function DetailPreview() {
  const [previewData, setPreviewData] = useState<WwwPreview>()
  const [articleHtmlAst, setArticleHtmlAst] = useState<AstRootNode | null>(null)

  useEffect(() => {
    window.parent.postMessage(`[${msgKey}] READY`, '*')
  }, [])

  useEffect(() => {
    async function receiveMessage(event: MessageEvent) {
      if (event.origin === window.location.origin) {
        return
      }

      const { hostname } = new URL(event.origin)
      if (
        ![
          /\.qiniu\.com$/,
          /\.qiniu\.io$/,
          /^localhost$/
        ].some(pattern => pattern.test(hostname))
      ) {
        return
      }

      let input
      try {
        input = JSON.parse(event.data)
      } catch (error) {
        return
      }

      if (!(msgKey in input)) {
        return
      }

      const data: WwwPreview = input[msgKey]

      if (data.type === ContentType.Article) {
        setArticleHtmlAst(await mdTextToHTMLAst(data.contentDetail.content))
      }

      setPreviewData(data)
    }

    window.addEventListener('message', receiveMessage, false)
    return () => {
      window.removeEventListener('message', receiveMessage, false)
    }
  }, [])

  const preview = useMemo(() => (
    previewData
    ? { editPagePrefix: previewData.editPagePrefix }
    : undefined
  ), [previewData])

  if (!previewData) {
    return null
  }

  return (
    <Detail
      type={previewData.type}
      contentDetail={previewData.contentDetail}
      articleHtmlAst={articleHtmlAst}
      createdAt={previewData.createdAt ? Number(previewData.createdAt) : undefined}
      preview={preview}
    />
  )
}
