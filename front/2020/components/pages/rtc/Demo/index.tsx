/**
 * @file rtc Demo Component
 * @author zhuhao <zhuhao@qiniu.com>
 */

import React from 'react'
import Section from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import ForPc from './Pc'
import ForMobile from './Mobile'

export default function Demo() {
  const isMobile = useMobile()

  return (
    <Section title="体验 Demo" name="demo" grey>
      {isMobile ? <ForMobile /> : <ForPc />}
    </Section>
  )
}
