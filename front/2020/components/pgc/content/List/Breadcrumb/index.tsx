/**
 * @file 面包屑
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'react-icecream-2'

import { ContentType, contentTypeTextMap } from 'constants/pgc/content'
import { getIndexUrl, getListUrl } from '../../url'

import style from './style.less'

export interface Props {
  type: ContentType
}

export default function PgcBreadcrumb({ type }: Props) {
  return (
    <Breadcrumb className={style.breadcrumb}>
      <BreadcrumbItem className={style.item} href={getIndexUrl()}>
        首页
      </BreadcrumbItem>
      <BreadcrumbItem className={style.item} href={getListUrl(type, null)}>
        {contentTypeTextMap[type]}
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
