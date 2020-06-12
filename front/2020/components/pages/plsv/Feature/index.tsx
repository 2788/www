import React, { CSSProperties } from 'react'
import { useMobile } from 'hooks/ua'
import Section from 'components/Product/Section'

import ForPc from './Pc'
import ForMobile from './Mobile'

export default function Feature() {
  const isMobile = useMobile()
  const mobileStyle: CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }
  return (
    <Section title="产品功能" name="features" style={isMobile ? mobileStyle : {}}>
      {isMobile ? <ForMobile /> : <ForPc />}
    </Section>
  )
}

