/**
 * @file 产品页 产品架构
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import style from './style.less'

interface Props {
  url: string
  title?: string
  alt?: string
}

export default function ProductArchitecture(
  { url, title = '产品架构图', alt = '产品架构图' }: Props
) {
  return (
    <div className={style.architectureImg}>
      <img src={url} title={title} alt={alt} />
    </div>
  )
}
