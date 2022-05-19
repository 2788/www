/**
 * @file file list
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ReleasedContent } from 'constants/pgc/content'

import { FileItem } from '../../File'

import style from './style.less'

export interface Props {
  contents: ReleasedContent[]
}

export default function FileList({ contents }: Props) {
  return (
    <div className={style.items}>
      {contents.map(content => (
        <div key={content.id} className={style.item}>
          <FileItem id={content.id} contentDetail={content.release} />
        </div>
      ))}
    </div>
  )
}
