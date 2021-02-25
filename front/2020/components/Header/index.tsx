import React from 'react'

import { useMobile } from 'hooks/ua'
import { useSetCpsKeyCookie } from 'hooks/cps'

import Pc from './Pc'
import Mobile from './Mobile'

export default function Header() {
  const isMobile = useMobile()

  useSetCpsKeyCookie()

  return isMobile ? <Mobile /> : <Pc />
}
