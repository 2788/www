import React from 'react'
import { Node } from '..'
import Positioned from '../Positioned'
import Line from '../Line'
import SDKIcon from '../icons/media/SDK'

export default function Sdk() {
  return (
    <>
      <Positioned top={458} left={146}><Line width={27} /></Positioned>
      <Positioned identity={Node.Sdk} top={405} left={184}>
        <svg width="144" height="165" viewBox="0 0 144 165">
          <SDKIcon />
          <g fill="none" transform="translate(0, 10)">
            <g transform="translate(12 109)">
              <rect width="120" height="32" fill="#E0F7FF"></rect>
              <text fill="#34A1EC">
                <tspan x="46" y="21">SDK</tspan>
              </text>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
