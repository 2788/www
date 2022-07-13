/**
 * @file 全局的注册入口
 * @description 移动端 & PC 端表现不同
 */

import React from 'react'
import { useUserInfo } from 'components/UserInfo'
import { useMobile } from 'hooks/ua'
import MobileEntry from './Mobile'

export default function RegisterEntry() {
  const userInfo = useUserInfo()
  const isMobile = useMobile()

  // 如 PC 端、正在请求用户信息或已登录，则不展示注册入口
  if (!isMobile || !userInfo || userInfo.signedIn) {
    return null
  }

  return <MobileEntry />
}
