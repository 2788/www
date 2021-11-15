/**
 * @file          component  GlobalBanner
 * @description   全局公告组件
 * @author        renpanpan
 */

import React from 'react'
import { useRouter } from 'next/router'

import { useMobile } from 'hooks/ua'
import Link from 'components/Link'
import { globalBannersRes } from 'hack/initial-data/data.json'
import { handleResponseData, getFilteredList } from 'apis/admin'

import style from './style.less'

export default function GlobalBanner() {
  const isMobile = useMobile()
  const { pathname } = useRouter()
  const globalBanners = getFilteredList(handleResponseData(globalBannersRes))
  if (globalBanners == null || globalBanners.length === 0) {
    return null
  }
  // admin 后台限制，同一区间只能有一个全局公告
  // todo：后期如果该限制取消，这边逻辑可能也要改下
  const banner = globalBanners[0]
  const displayPages = banner.displayPages
  // 如果未配置首页展示，则不在首页展示
  if (!displayPages.includes('www-homepage') && pathname === '/') {
    return null
  }
  // 如果未配置其他页面展示，则不在其他页面展示
  if (!displayPages.includes('www-others') && pathname !== '/') {
    return null
  }
  if (isMobile) {
    return (
      <Link href={banner.link}>
        <img className={style.logo} src={banner.mobileImg} />
      </Link >
    )
  }
  return (
    <Link
      className={style.wrapper}
      href={banner.link}
      style={{ backgroundColor: banner.backgroundColor }}
    >
      <div className={style.container} style={{ backgroundImage: `url(${banner.pcImg})` }} />
    </Link>
  )
}
