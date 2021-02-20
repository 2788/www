import React from 'react'

import { useMobile } from 'hooks/ua'
import { useQueryValue } from 'hooks/url'

import Pc from './Pc'
import Mobile from './Mobile'

export default function Header() {
  const isMobile = useMobile()

  // 如果 url 有 cps_key query 参数
  // 则种下对应的 cookie
  // https://jira.qiniu.io/browse/BO-15948
  // TODO: 先临时支持一下，后续再优化
  const [cpsKey] = useQueryValue('cps_key', '')
  if (cpsKey) {
    const hostname = window.location.hostname
    const domain = hostname.split('.').slice(-2).join('.')
    const date = new Date()
    // cps_key cookie 有效期为 7 天
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000))
    document.cookie = `cps_key=${cpsKey}; domain=${domain}; path=/; expires=${date.toUTCString()}`
  }

  return isMobile ? <Mobile /> : <Pc />
}
