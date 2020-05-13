/**
 * @file 页面底部内容
 * @description 包含各种链接、公安备案信息等内容
 */

import React from 'react'
import { useMobile } from 'hooks/ua'
import Pc from './Pc'
import Mobile from './Mobile'

export default function Footer() {
  const isMobile = useMobile()

  return isMobile ? <Mobile /> : <Pc />
}
