import React, { ReactNode } from 'react'

import { useMobile } from 'hooks/ua'

import Pc from './Pc'
import Mobile from './Mobile'

export interface Props {
  serial: ReactNode
  title: string
  desc: string
  bgUrl: string
  popDir: 'up' | 'down'
}

export default function Item(props: Props) {
  const isMobile = useMobile()
  return isMobile
    ? (<Mobile title={props.title} desc={props.desc} />)
    : (<Pc {...props} />)
}
