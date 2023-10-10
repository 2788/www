import React from 'react'

import { useMobile } from 'hooks/ua'

import Pc from './Pc'
import Mobile from './Mobile'

export type CasesProps = {
  customLogoUrls?: string[]
}

export default function Cases(props: CasesProps) {
  const isMobile = useMobile()
  return (
    <>
      {
        isMobile ? <Mobile customLogoUrls={props.customLogoUrls} /> : <Pc customLogoUrls={props.customLogoUrls} />
      }
    </>
  )
}
