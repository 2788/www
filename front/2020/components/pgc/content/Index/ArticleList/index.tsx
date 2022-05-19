/**
 * @file article list
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import classNames from 'classnames'

import { ReleasedContent } from 'constants/pgc/content'

import { ArticleItem } from '../../Article'

import style from './style.less'

export interface Props {
  contents: ReleasedContent[]
  className?: string
}

export default function ArticleList({ contents, className }: Props) {
  return (
    <div className={classNames(style.list, className)}>
      {contents.map(content => (
        <div key={content.id} className={style.item}>
          <ArticleItem id={content.id} contentDetail={content.release} />
        </div>
      ))}
    </div>
  )
}
