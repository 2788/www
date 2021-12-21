import React from 'react'
import Positioned from '../share/Positioned'
import { Node } from '..'
import MultiMediaDataIcon from '../icons/media/MultiMediaData'

export default function MultiMediaData() {
  return (
    <Positioned identity={Node.MultiMediaData} top={415} left={0}>
      <svg width="120" height="141" viewBox="0 0 120 141">
        <MultiMediaDataIcon />
        <g fill="none">
          <g transform="translate(0 109)">
            <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
            <text fill="#2B65D6">
              <tspan x="25" y="21">多媒体数据</tspan>
            </text>
          </g>
        </g>
      </svg>
    </Positioned>
  )
}
