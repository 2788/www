import React from 'react'
import { useMobile } from 'hooks/ua'
import Section from 'components/Product/Section'

import ForPc from './Pc'
import ForMobile from './Mobile'

export default function Feature() {
  const isMobile = useMobile()

  return (
    <Section title="产品功能" name="features" style={isMobile ? { padding: '16px 0' } : {}}>
      {isMobile ? <ForMobile /> : <ForPc />}
    </Section>
  )
}

