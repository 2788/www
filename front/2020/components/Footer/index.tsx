import React from 'react'
import { useMobile } from 'hooks/ua'
import Pc from './Pc'
import Mobile from './Mobile'

export default function Footer() {
  const isMobile = useMobile()

  return isMobile ? <Mobile /> : <Pc />
}
