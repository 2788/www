/**
 * @file 种类选择
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import classNames from 'classnames'

import { ContentType, contentTypes, contentTypeTextMap } from 'constants/pgc/content'
import Link from 'components/Link'

import { getListUrl } from '../../url'

import style from './style.less'

export interface Props {
  type: ContentType
}

export default function TypeNav({ type }: Props) {
  return (
    <div className={style.nav}>
      {contentTypes.map(contentType => (
        <Link
          key={contentType}
          href={getListUrl(contentType, null)}
          className={classNames(type === contentType && style.active)}
        >
          {contentTypeTextMap[contentType]}
        </Link>
      ))}
    </div>
  )
}
