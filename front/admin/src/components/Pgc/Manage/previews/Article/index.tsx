/**
 * @file article preview
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ContentDetail, ContentType, contentTypeTextMap } from 'constants/pgc/conetnt'

import MarkdownPreview from '../Markdown'
import Layout from '../Layout'

// import style from './style.m.less'

export interface Props {
  contentDetail: ContentDetail
}

export default function ArticlePreview({ contentDetail }: Props) {
  return (
    <Layout contentDetail={contentDetail}>
      <MarkdownPreview text={contentDetail.content} />
    </Layout>
  )
}

export function EmbedArticlePreview() {
  return (
    <p>暂未支持嵌入{contentTypeTextMap[ContentType.Article]}种类的内容</p>
  )
}
