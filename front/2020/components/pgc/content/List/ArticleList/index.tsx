/**
 * @file article list
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ReleasedContent } from 'constants/pgc/content'

import { ArticleItem } from '../../Article'

import style from './style.less'

export interface Props {
  contents: ReleasedContent[]
}

export default function ArticleList({ contents }: Props) {
  return (
    <div className={style.items}>
      {contents.map(content => (
        <div key={content.id} className={style.item}>
          <ArticleItem id={content.id} contentDetail={content.release} />
        </div>
      ))}
    </div>
  )
}
