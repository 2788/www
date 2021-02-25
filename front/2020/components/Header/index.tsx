import React from 'react'

import { useMobile } from 'hooks/ua'
import { useReportCpsVisit } from 'hooks/cps'

import Pc from './Pc'
import Mobile from './Mobile'

export default function Header() {
  const isMobile = useMobile()

  useReportCpsVisit()

  return isMobile ? <Mobile /> : <Pc />
}
