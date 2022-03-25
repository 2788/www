/**
 * @file unreleased embed preview
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { pgcManageEditTitle } from 'constants/route'
import { Content } from 'constants/pgc/conetnt'
import { getEditPageUrl } from 'transforms/pgc/content'

export interface Props {
  content: Content
}

export default function UnreleasedEmbedPreview({ content }: Props) {
  return (
    <p>
      当前内容未发布，请发布后再预览。
      {/* eslint-disable-next-line react/jsx-no-target-blank */}
      <a href={getEditPageUrl(content.id)} target="_blank">
        点击进入{pgcManageEditTitle}页面
      </a>
    </p>
  )
}
