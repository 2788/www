import React from 'react'
import Positioned from '../share/Positioned'
import { Node } from '..'
import MachineDataIcon from '../icons/machine/MachineData'

export default function MachineData() {
  return (
    <Positioned identity={Node.MachineData} top={159} left={0}>
      <svg width="120" height="261" viewBox="0 0 120 261">
        <MachineDataIcon />
        <g transform="translate(0 109)">
          <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
          <text fill="#2B65D6">
            <tspan x="32" y="21">机器数据</tspan>
          </text>
        </g>
        <g transform="translate(0 149)">
          <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
          <text fill="#2B65D6">
            <tspan x="32" y="21">业务数据</tspan>
          </text>
        </g>
        <g transform="translate(0 189)">
          <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
          <text fill="#2B65D6">
            <tspan x="33.575" y="21">IoT 数据</tspan>
          </text>
        </g>
        <g transform="translate(0 229)">
          <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
          <text fill="#2B65D6">
            <tspan x="32" y="21">安全数据</tspan>
          </text>
        </g>
      </svg>
    </Positioned>
  )
}
