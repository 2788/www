/**
 * @file          component  ad
 * @description   顶部广告组件
 * @author        renpanpan
 */

import React from 'react'
import { useRouter } from 'next/router'

import { useMobile } from 'hooks/ua'
import Link from 'components/Link'

import mobileLogo from './images/mobile.jpg'
import style from './style.less'

const shouldShowAd = true // 是否应该展示顶部广告，后期如果下架，直接更改为 false 即可

export default function Ad() {
  const { pathname } = useRouter()
  if (!shouldShowAd) {
    return null
  }
  return pathname !== '/' ? <Content /> : null
}

const url = 'https://marketing.qiniu.com/activity/2021-1111-act?entry=www-top-banner'

function Content() {
  const isMobile = useMobile()
  if (isMobile) {
    return (
      <Link href={url}>
        <img className={style.logo} src={mobileLogo} />
      </Link >
    )
  }
  return (
    <Link className={style.wrapper} href={url}>
      <div className={style.container} />
    </Link>
  )
}
