import React from 'react'

import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'

import Pc from './Pc'
import Mobile from './Mobile'

export default function Cases() {
  const isMobile = useMobile()
  return (
    <Section title="成功案例">
      {
        isMobile ? <Mobile /> : <Pc />
      }
    </Section>
  )
}
