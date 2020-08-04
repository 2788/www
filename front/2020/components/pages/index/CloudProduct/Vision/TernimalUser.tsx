import React from 'react'
import Positioned from '../Positioned'
import { Node } from '..'
import Line from '../Line'
import TerminalUserIcon from '../icons/media/TerminalUser'

export default function TerminalUser() {
  return (
    <>
      <Positioned top={458} left={954}><Line width={27} /></Positioned>
      <Positioned identity={Node.TerminalUser} top={415} left={1008}>
        <svg width="120" height="140" viewBox="0 0 120 140">
          <TerminalUserIcon />
          <g fill="none">
            <g transform="translate(0 108)">
              <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
              <text fill="#5272F4">
                <tspan x="32" y="21">终端用户</tspan>
              </text>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
