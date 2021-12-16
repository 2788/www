import React from 'react'

import { useMobile } from 'hooks/ua'
import Section from 'components/pages/index/Section'

import Pc from './Pc'
import Mobile from './Mobile'

export default function Solutions() {
  const isMobile = useMobile()
  const title = isMobile
    ? <>丰富、全方位的解决方案，让<br />您轻松应对各种行业和场景</>
    : '丰富、全方位的解决方案，让您轻松应对各种行业和场景'

  return (
    <Section title={title}>
      {
        isMobile ? <Mobile /> : <Pc />
      }
    </Section>
  )
}
