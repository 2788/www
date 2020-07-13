import React from 'react'
import Positioned from '../Positioned'
import { Node } from '..'

import MachineDataIcon from '../icons/machine/MachineData'

export default function MachineData() {
  return (
    <Positioned identity={Node.MachineData} top={75} left={0}>
      <svg width="120" height="141" viewBox="0 0 120 141">
        <MachineDataIcon />
        <g transform="translate(0 109)">
          <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
          <text fill="#2B65D6">
            <tspan x="32" y="21">机器数据</tspan>
          </text>
        </g>
      </svg>
    </Positioned>
  )
}
