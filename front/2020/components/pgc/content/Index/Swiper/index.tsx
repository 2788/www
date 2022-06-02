/**
 * @file Swiper
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'

import Swiper from 'components/UI/Swiper'
import { Banner } from 'constants/pgc/content-banner'

import style from './style.less'

export interface Props {
  banners: Banner[]
}

export default function Pgc({ banners }: Props) {
  if (banners.length === 0) {
    return null
  }

  return (
    <Swiper withArrow type="classic" autoplay>
      {banners.map((banner, index) => (
        <a
          key={index}
          href={banner.link}
          rel="noopener"
          className={style.slide}
          style={{ backgroundImage: `url("${banner.img}")` }}
        >
        </a>
      ))}
    </Swiper>
  )
}
