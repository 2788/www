/**
 * @file “在文档中心搜索存储”链接
 */

import React from 'react'
import { urlFor } from 'utils'
import { track } from 'utils/sensors'

import ArrowRightIcon from './arrow-right.svg'
import style from './style.less'

const developerSiteUrl = 'https://developer.qiniu.com'

export type Props = {
  keyword: string
}

export default function DeveloperSiteSearch({ keyword }: Props) {

  const searchUrl = urlFor(
    developerSiteUrl + '/search',
    { keyword }
  )

  return (
    <a className={style.wrapper} target="_blank" rel="noopener" href={searchUrl} onClick={() => track('Search', { keyword })}>
      <p className={style.text}>
        在文档中心搜索
        <span className={style.key}>{keyword}</span>
      </p>
      <ArrowRightIcon className={style.arrow} />
    </a>
  )
}
