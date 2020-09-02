import React from 'react'
import Link from 'components/Link'
import { urlMap, Product } from 'constants/products'
import { urlMap as lanUrlMap, Landpage } from 'constants/landpage'

import Positioned from '../Positioned'
import Line from '../Line'
import { Node } from '..'
import SDKIcon from '../icons/media/SDK'
import style from '../index.less'

export default function Pili() {
  return (
    <>
      <Positioned top={370} left={160}><Line width={27} /></Positioned>
      <Positioned identity={Node.Pili} left={168} top={308} zIndex={1}>
        <svg width="272" height="215" viewBox="0 0 272 215">
          <defs>
            <mask id="all-pili" width="272" height="96" x="0" y="0" fill="#fff" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox">
              <rect width="272" height="96" x="0" y="0"></rect>
            </mask>
          </defs>
          <g transform="translate(66 0)">
            <SDKIcon />
          </g>
          <g fill="none" fillRule="evenodd" transform="translate(0 10)">
            <g transform="translate(0 109)">
              <rect width="272" height="96" x="0" y="0" stroke="#00AAE7" strokeDasharray="4 8" strokeWidth="2" mask="url(#all-pili)"></rect>
              <Link href={lanUrlMap[Landpage.Sdk]} className={style.link}>
                <g transform="translate(12 12)">
                  <rect width="120" height="32" fill="#E0F7FF"></rect>
                  <text fill="#34A1EC">
                    <tspan x="46" y="21">SDK</tspan>
                  </text>
                </g>
              </Link>
              <Link href={urlMap[Product.Pili]} className={style.link}>
                <g transform="translate(140 12)">
                  <rect width="120" height="32" fill="#E0F7FF"></rect>
                  <text fill="#34A1EC">
                    <tspan x="20" y="21">视频直播 Pili</tspan>
                  </text>
                </g>
              </Link>
              <Link href={urlMap[Product.Rtn]} className={style.link}>
                <g transform="translate(12 52)">
                  <rect width="120" height="32" fill="#E0F7FF"></rect>
                  <text fill="#34A1EC">
                    <tspan x="9" y="21">实时音视频 RTC</tspan>
                  </text>
                </g>
              </Link>
              <Link href={urlMap[Product.Qvs]} className={style.link}>
                <g transform="translate(140 52)">
                  <rect width="120" height="32" fill="#E0F7FF"></rect>
                  <text fill="#34A1EC">
                    <tspan x="15" y="21">视频监控 QVS</tspan>
                  </text>
                </g>
              </Link>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
