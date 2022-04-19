/**
 * @file Embed
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { useApiWithParams } from 'hooks/api'
import { ContentId, ContentType, Preview } from 'constants/pgc/content'
import { getContent } from 'apis/admin/pgc/content'
import Loading from 'components/UI/Loading'

import { EmbedVideo } from '../../Video'
import { EmbedFile } from '../../File'
import { getContentDetailUrl } from './utils'

export interface Props {
  id: ContentId
  preview?: Preview
}

export default function Embed({ id, preview }: Props) {
  const { $: content, loading } = useApiWithParams(getContent, { params: [id] })

  if (content) {
    const { type, release } = content
    if (release) {
      if (type === ContentType.File) {
        return (
          <EmbedFile contentDetail={release} />
        )
      }

      if (type === ContentType.Video) {
        return (
          <EmbedVideo contentDetail={release} />
        )
      }
    } else if (preview) {
      return (
        <p>
          当前内容未发布，请发布后再预览。
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a href={`${preview.editPagePrefix}${id}`} target="_blank">
            点击进入编辑页面
          </a>
        </p>
      )
    }
  }

  const url = getContentDetailUrl(id)
  return (
    <Loading loading={loading}>
      <p>
        {/* eslint-disable-next-line react/jsx-no-target-blank */}
        <a href={url} target="_blank" title="点击查看内容">
          {url}
        </a>
      </p>
    </Loading>
  )
}
