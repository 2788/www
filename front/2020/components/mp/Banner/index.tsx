import React from 'react'

import style from './index.less'

export type BannerProps = {
  banner: string
}

export default function Banner({ banner }: BannerProps) {
  return (
    <div className={style.banner}>
      <img src={banner} alt="banner" />
    </div>
  )
}
