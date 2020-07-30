import React from 'react'
import { useMobile } from 'hooks/ua'
import ForMobile from './Mobile'
import ForPc from './Pc'

export default function Core() {
  return useMobile() ? <ForMobile /> : <ForPc />
}
