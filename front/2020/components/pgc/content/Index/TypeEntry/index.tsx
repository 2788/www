/**
 * @file type entry
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { Fragment } from 'react'

import { ContentType, contentTypes } from 'constants/pgc/content'
import Link from 'components/Link'

import { getListUrl } from '../../url'

import style from './style.less'

import articleIconSrc from './article.png'
import videoIconSrc from './video.png'
import fileIconSrc from './file.png'

const iconSrcMap = {
  [ContentType.Article]: articleIconSrc,
  [ContentType.Video]: videoIconSrc,
  [ContentType.File]: fileIconSrc
}

const contentTypeTextMap = {
  [ContentType.Article]: '文章资讯',
  [ContentType.Video]: '视频资料',
  [ContentType.File]: '技术资料'
}

export default function TypeEntry() {
  return (
    <div className={style.typeEntry}>
      {contentTypes.map((type, index) => (
        <Fragment key={index}>
          {index !== 0 && (<div className={style.sep}></div>)}
          <Link key={type} href={getListUrl(type, null)} className={style.item}>
            <img src={iconSrcMap[type]} className={style.icon} alt={`${type}-icon`} />
            <span className={style.type}>{contentTypeTextMap[type]}</span>
          </Link>
        </Fragment>
      ))}
    </div>
  )
}
