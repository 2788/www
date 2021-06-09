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

export default function Ad() {
  const { pathname } = useRouter()
  return pathname !== '/' ? <Content /> : null
}

const url = 'https://marketing.qiniu.com/activity/2021618-activity?entry=www-top-banner#lottery-618'

function Content() {
  return useMobile() ? (
    <Link href={url}>
      <img className={style.logo} src={mobileLogo} />
    </Link >
  ) : (
    <Link className={style.wrapper} href={url}>
      <div className={style.container} />
    </Link>
  )
}
