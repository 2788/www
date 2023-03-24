/**
 * @file Demo 体验
 */

import React from 'react'
import { useMobile } from 'hooks/ua'

import ForPc from './Pc'
import ForMobile from './Mobile'

interface Item {
  /** 二维码地址 */
  demoUrl: string
  /** 描述文案 */
  desc: string
}

export interface Props {
  items: Item[]
}

export default function Demos(props: Props) {
  const isMobile = useMobile()
  return isMobile ? (<ForMobile {...props} />) : (<ForPc {...props} />)
}
