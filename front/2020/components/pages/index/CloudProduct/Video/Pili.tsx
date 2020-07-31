import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import style from '../index.less'
import Line from '../Line'
import { Node } from '..'
import SDKIcon from '../icons/media/SDK'

export default function Pili() {
  return (
    <>
      <Positioned top={458} left={327}><Line width={27} /></Positioned>
      <Positioned identity={Node.Pili} top={405} left={378} zIndex={1}>
        <svg width="144" height="285" viewBox="0 0 144 285">
          <SDKIcon />
          <g fill="none" transform="translate(0, 10)">
            <rect width="144" height="136" x="0" y="109" stroke="#00AAE7" strokeDasharray="4 8" strokeWidth="2" mask="url(#全部产品-sdk-b)"></rect>
            <Link className={style.link} href="/products/pili">
              <g transform="translate(12 121)">
                <rect width="120" height="32" fill="#E0F7FF"></rect>
                <text fill="#34A1EC">
                  <tspan x="20" y="21">视频直播 Pili</tspan>
                </text>
              </g>
            </Link>
            <Link className={style.link} href="/products/rtn">
              <g transform="translate(12 161)">
                <rect width="120" height="32" fill="#E0F7FF"></rect>
                <text fill="#34A1EC">
                  <tspan x="9" y="21">实时音视频 RTC</tspan>
                </text>
              </g>
            </Link>
            <g transform="translate(12 201)">
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
