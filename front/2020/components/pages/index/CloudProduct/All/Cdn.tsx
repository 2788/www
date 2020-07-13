import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import style from '../index.less'
import Line from '../Line'
import { Node } from '..'

import CDNIcon from '../icons/media/CDN'

export default function Cdn() {
  return (
    <>
      <Positioned top={458} left={689}><Line width={27} /></Positioned>
      <Positioned identity={Node.Cdn} top={415} left={768}>
        <svg width="120" height="140" viewBox="0 0 120 140">
          <CDNIcon />
          <g fill="none">
            <Link className={style.link} href="/products/qcdn">
              <g transform="translate(0 108)">
                <rect width="120" height="32" fill="#E0F7FF"></rect>
                <text fill="#34A1EC">
                  <tspan x="45" y="21">CDN</tspan>
                </text>
              </g>
            </Link>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
