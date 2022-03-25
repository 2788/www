/**
 * @file video preview
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ContentDetail } from 'constants/pgc/conetnt'

import InitialEmbed, { Props as InitialEmbedProps } from '../InitialEmbed'
import Layout from '../Layout'

import style from './style.m.less'

export interface Props {
  contentDetail: ContentDetail
}

function Video({ contentDetail }: Props) {
  return (
    <div>
      <video
        src={contentDetail.content}
        controls
        controlsList="nodownload" // TODO: 根据配置决定
        preload="auto"
        poster={contentDetail.posterUrl}
        title={contentDetail.title}
        className={style.video}
      ></video>
    </div>
  )
}

export default function VideoPreview({ contentDetail }: Props) {
  return (
    <Layout contentDetail={contentDetail}>
      <Video contentDetail={contentDetail} />
    </Layout>
  )
}

export interface EmbedVideoPreviewProps extends InitialEmbedProps {}

export function EmbedVideoPreview(props: EmbedVideoPreviewProps) {
  const { contentDetail } = props

  if (contentDetail == null) {
    return (
      <InitialEmbed {...props} />
    )
  }

  return (
    <div className={style.embedPreview}>
      <Video contentDetail={contentDetail} />
      <p>{contentDetail.title}</p>
    </div>
  )
}
