/**
 * @file sidebar
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import { ContentId, ContentDetail } from 'constants/pgc/content'

import RecommendedArticles from './Articles'
import Solutions from './Solutions'
import Products from './Products'

import style from './style.less'

export interface Props {
  id?: ContentId
  contentDetail: ContentDetail
}

export default function Sidebar(props: Props) {
  if (props.id == null) {
    return null
  }

  return (
    <div className={style.sidebar}>
      <RecommendedArticles id={props.id} contentDetail={props.contentDetail} />
      <Solutions keywords={props.contentDetail.keywords} />
      <Products keywords={props.contentDetail.keywords} />
    </div>
  )
}
