import React from 'react'
import Positioned from '../share/Positioned'
import { Node } from '..'

import MachineDataIcon from '../icons/machine/MachineData'

export default function MachineData() {
  return (
    <Positioned identity={Node.MachineData} top={75} left={0}>
      <MachineDataIcon />
    </Positioned>
  )
}
