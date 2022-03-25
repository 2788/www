/**
 * @file base layout
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { PropsWithChildren } from 'react'

import { ContentDetail } from 'constants/pgc/conetnt'

import style from './style.m.less'

export interface Props {
  contentDetail: ContentDetail
}

export default function Layout({ contentDetail, children }: PropsWithChildren<Props>) {
  return (
    <div>
      <h2 className={style.title}>{contentDetail.title}</h2>
      {children}
    </div>
  )
}
