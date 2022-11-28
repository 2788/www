/**
 * @file 内容详情预览页，主要给 admin 用
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useState, useMemo, useEffect } from 'react'

import { ContentType, ContentDetail } from 'constants/pgc/content'
import { isPreviewContext, usePreviewMessage } from 'utils/admin-preview'
import { mdTextToHTMLAst, AstRootNode } from 'components/pgc/content/Article'

import Detail from '../[id]'

const msgKey = 'QINIU_PGC_CONTENT_DETAIL_PREVIEW'

interface WwwPreview {
  type: ContentType
  contentDetail: ContentDetail
  createdAt?: number
  editPagePrefix: string
}

export default function PgcDetailPreview() {
  const previewData = usePreviewMessage<WwwPreview>(msgKey)
  const [articleHtmlAst, setArticleHtmlAst] = useState<AstRootNode | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (previewData == null) {
      setIsReady(false)
      return
    }

    if (previewData.type === ContentType.Article) {
      setIsReady(false)
      mdTextToHTMLAst(previewData.contentDetail.content).then(setArticleHtmlAst).then(() => { setIsReady(true) })
    } else {
      setIsReady(true)
    }
  }, [previewData])

  const preview = useMemo(() => (
    previewData
    ? { editPagePrefix: previewData.editPagePrefix }
    : null
  ), [previewData])

  if (!isReady || preview == null || previewData == null) {
    return null
  }

  return (
    <isPreviewContext.Provider value>
      <Detail
        id={null}
        type={previewData.type}
        contentDetail={previewData.contentDetail}
        articleHtmlAst={articleHtmlAst}
        createdAt={previewData.createdAt ? Number(previewData.createdAt) : null}
        preview={preview}
      />
    </isPreviewContext.Provider>
  )
}
