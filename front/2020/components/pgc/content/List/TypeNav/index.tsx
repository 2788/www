/**
 * @file 种类选择
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import classNames from 'classnames'

import { ContentType, contentTypes, contentTypeTextMap, ContentCategory } from 'constants/pgc/content'
import Link from 'components/Link'

import { getListUrl } from '../../url'

import style from './style.less'

export interface Props {
  type: ContentType
  category: ContentCategory | null
}

export default function TypeNav({ type, category }: Props) {
  return (
    <div className={style.nav}>
      {contentTypes.map(contentType => (
        <Link
          key={contentType}
          href={getListUrl(contentType, category)}
          className={classNames(type === contentType && style.active)}
        >
          {contentTypeTextMap[contentType]}
        </Link>
      ))}
    </div>
  )
}
