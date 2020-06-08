/**
 * @file 移动端 Demo 组件
 * @description 包括 Android & iOS 二维码
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import Section from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import ForPc from './Pc'
import ForMobile from './Mobile'

export type Props = {
  androidUrl: string
  iosUrl: string
  webUrl?: string
}

export default function Demo(props: Props) {
  const isMobile = useMobile()

  return (
    <Section title="体验 Demo" name="demo">
      {isMobile ? <ForMobile {...props} /> : <ForPc {...props} />}
    </Section>
  )
}
