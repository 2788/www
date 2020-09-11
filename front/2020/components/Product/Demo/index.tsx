/**
 * @file 移动端 Demo 组件
 * @description 包括 Android & iOS 二维码
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React, { CSSProperties } from 'react'
import Section from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import ForPc from './Pc'
import ForMobile from './Mobile'

export type Props = {
  androidUrl: string
  iosUrl: string
  webUrl?: string
  mpImgUrl?: string
}

export default function Demo(props: Props) {
  const isMobile = useMobile()
  const mobileStyle: CSSProperties = {
    paddingLeft: '0',
    paddingRight: '0',
    paddingBottom: '0'
  }
  return (
    <Section title="Demo 体验" name="demo" style={isMobile ? mobileStyle : {}}>
      {isMobile ? <ForMobile {...props} /> : <ForPc {...props} />}
    </Section>
  )
}
