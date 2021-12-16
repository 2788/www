import React from 'react'

import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'

import Pc from './Pc'
import Mobile from './Mobile'

export default function Cases() {
  const isMobile = useMobile()
  return (
    <Section title="100w+ 企业和开发者的共同选择">
      {
        isMobile ? <Mobile /> : <Pc />
      }
    </Section>
  )
}
