import Section from 'components/Product/Section'
import { useMobile } from 'hooks/ua'
import React, { CSSProperties } from 'react'
import ForPc from './Pc'
import ForMobile from './Mobile'

export default function Demos() {
  const isMobile = useMobile()
  const mobileStyle: CSSProperties = {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  }
  return (
    <Section title="Demo 体验" name="demo" style={isMobile ? mobileStyle : {}}>
      {isMobile ? <ForMobile /> : <ForPc />}
    </Section>
  )

}
