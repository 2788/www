/**
 * @file video list
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ContentType, ContentCategory, ReleasedContent } from 'constants/pgc/content'
import Link from 'components/Link'

import { getListUrl } from '../../url'
import { VideoItem } from '../../Video'

import style from './style.less'

export interface Props {
  category: ContentCategory | null
  contents: ReleasedContent[]
}

export default function VideoList({ category, contents }: Props) {
  if (contents.length === 0) {
    return (
      <div className={style.placeholder}></div>
    )
  }

  return (
    <div className={style.main}>
      <header className={style.header}>
        <h3>视频</h3>
        {/* TODO: 支持 `查看更多视频` */}
        <Link href={getListUrl(ContentType.Video, category)}>查看全部视频</Link>
      </header>
      <div className={style.list}>
        {contents.map(content => (
          <div key={content.id} className={style.item}>
            <VideoItem
              id={content.id}
              contentDetail={content.release}
              mobileTheme="vertical"
              className={style.video}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
