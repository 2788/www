/**
 * @file initial embed preview
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ContentDetail } from 'constants/pgc/conetnt'
import { getWwwContentDetailUrl } from 'transforms/pgc/content'

export interface Props {
  id: string
  contentDetail?: ContentDetail
}

export default function InitialEmbedPreview({ id, contentDetail }: Props) {
  const url = getWwwContentDetailUrl(id)
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a href={url} target="_blank" title="点击查看内容">
        {contentDetail ? contentDetail.title : url}
      </a>
    </div>
  )
}
