/**
 * @file video list
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ReleasedContent } from 'constants/pgc/content'

import { VideoItem } from '../../Video'

import style from './style.less'

export interface Props {
  contents: ReleasedContent[]
}

export default function VideoList({ contents }: Props) {
  return (
    <div className={style.items}>
      {contents.map(content => (
        <div key={content.id} className={style.item}>
          <VideoItem id={content.id} contentDetail={content.release} mobileTheme="horizontal" />
        </div>
      ))}
    </div>
  )
}
