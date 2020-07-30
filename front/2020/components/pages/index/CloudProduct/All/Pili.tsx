import React from 'react'
import Positioned from '../Positioned'
import Line from '../Line'
import { Node } from '..'
import SDKIcon from '../icons/media/SDK'

export default function Pili() {
  return (
    <>
      <Positioned top={458} left={160}><Line width={27} /></Positioned>
      <Positioned identity={Node.Pili} left={230} top={405} zIndex={1}>
        <svg width="144" height="165" viewBox="0 0 144 165">
          <SDKIcon />
          <g fill="none" transform="translate(0, 10)">
            <g transform="translate(12 109)">
              <rect width="120" height="32" fill="#E0F7FF"></rect>
              <text fill="#34A1EC">
                <tspan x="46" y="21">互动直播</tspan>
              </text>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
