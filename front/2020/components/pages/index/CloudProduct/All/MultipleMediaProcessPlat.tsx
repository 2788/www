import React from 'react'
import Positioned from '../Positioned'
import { Node } from '..'
import MultipleMediaProcessPlatIcon from '../icons/machine/MultipleMediaProcessPlat'

export default function MultipleMediaProcessPlat() {
  return (
    <>
      <Positioned identity={Node.MultiMediaDataProcess} top={65} left={320} zIndex={1}>
        <svg width="144" height="151">
          <MultipleMediaProcessPlatIcon />
          <g transform="translate(0 119)">
            <rect width="144" height="32" fill="#E0F7FF"></rect>
            <text fill="#00AAE7">
              <tspan x="9" y="21">视觉数据智能</tspan>
            </text>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
