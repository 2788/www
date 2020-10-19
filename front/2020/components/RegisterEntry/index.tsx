/**
 * @file 全局的注册入口
 * @description 移动端 & PC 端表现不同
 */

import React from 'react'
import { useUserInfo } from 'components/UserInfo'
import { useMobile } from 'hooks/ua'
import MobileEntry from './Mobile'
import PcEntry from './Pc'

export default function RegisterEntry() {
  const userInfo = useUserInfo()
  const isMobile = useMobile()

  // 正在请求用户信息，或已登录，则不展示注册入口
  if (!userInfo || userInfo.signedIn) {
    return null
  }

  return (
    isMobile
      ? <MobileEntry />
      : <PcEntry />
  )
}
