/**
 * @file 产品功能
 */

import React from 'react'
import { useMobile } from 'hooks/ua'

import Mobile from './Mobile'
import Pc from './Pc'

export default function Functions() {
  const isMobile = useMobile()
  return isMobile ? <Mobile /> : <Pc />
}
