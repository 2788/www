/**
 * @file image of poster / cover
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import style from './style.less'

export interface Props {
  url: string
  /** 高宽比 */
  ratio: number
  className?: string
}

export default function PosterImage({ url, ratio, className }: Props) {
  return (
    <div className={className ?? undefined}>
      <div
        className={style.image}
        style={{
          backgroundImage: `url(${url})`,
          paddingBottom: `${ratio * 100}%`
        }}
      ></div>
    </div>
  )
}
