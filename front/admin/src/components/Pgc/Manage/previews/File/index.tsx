/**
 * @file file preview
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'

import { ContentDetail } from 'constants/pgc/conetnt'

import InitialEmbed, { Props as InitialEmbedProps } from '../InitialEmbed'
import Layout from '../Layout'

import style from './style.m.less'

export interface Props {
  contentDetail: ContentDetail
}

function DownloadLink({ contentDetail, children }: PropsWithChildren<Props>) {
  return (
    <div>
      <a
        href={contentDetail.content}
        download
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
        title="点击下载文件"
      >
        {children}
      </a>
    </div>
  )
}

function PosterImage({ contentDetail }: Props) {
  return (
    <div>
      <img
        src={contentDetail.posterUrl}
        alt="文件封面"
        className={style.posterImg}
      />
    </div>
  )
}

export default function FilePreview({ contentDetail }: Props) {
  return (
    <Layout contentDetail={contentDetail}>
      <DownloadLink contentDetail={contentDetail}>
        <div>点击下载文件</div>
        <PosterImage contentDetail={contentDetail} />
      </DownloadLink>
    </Layout>
  )
}

export interface EmbedFilePreviewProps extends InitialEmbedProps {}

export function EmbedFilePreview(props: EmbedFilePreviewProps) {
  const { contentDetail } = props

  if (contentDetail == null) {
    return (
      <InitialEmbed {...props} />
    )
  }

  return (
    <div className={style.embedPreview}>
      <DownloadLink contentDetail={contentDetail}>
        <div>点击下载文件：{contentDetail.title}</div>
        <PosterImage contentDetail={contentDetail} />
      </DownloadLink>
    </div>
  )
}
