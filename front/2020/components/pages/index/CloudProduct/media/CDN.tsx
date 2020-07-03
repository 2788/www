import React, { useContext } from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import { Context } from '..'
import style from '../index.less'
import Line from '../Line'

export default function CDN() {
  const { isMachine, isVideo } = useContext(Context)
  if (isMachine) return null
  return (
    <>
      <Positioned top={458} left={isVideo ? 759 : 689}><Line width={27} /></Positioned>
      <Positioned top={415} left={isVideo ? 818 : 768}>
        <svg width="120" height="140" viewBox="0 0 120 140">
          <g fill="none">
            <Link className={style.link} href="/products/qcdn">
              <g transform="translate(0 108)">
                <rect width="120" height="32" fill="#E0F7FF"></rect>
                <text fill="#34A1EC">
                  <tspan x="45" y="21">CDN</tspan>
                </text>
              </g>
            </Link>
            <polygon fill="#C2E7FF" points="0 59.857 60 95.498 120 59.857 60 27"></polygon>
            <g transform="translate(19)">
              <mask id="cdn-b" fill="#fff">
                <polygon points="41 0 76.507 20.5 76.507 61.5 41 82 5.493 61.5 5.493 20.5"></polygon>
              </mask>
              <polygon points="41 0 76.507 20.5 76.507 61.5 41 82 5.493 61.5 5.493 20.5" fill="#74C6FF"></polygon>
              <path fill="#34A1EC" d="M-23,4 L12.5070416,24.5 L12.5069584,57.545 L41.0070416,74 L41.0070416,115 L5.5,135.5 L-30.0070416,115 L-30.0080416,81.954 L-58.5070416,65.5 L-58.5070416,24.5 L-23,4 Z" mask="url(#cdn-b)"></path>
            </g>
            <g transform="translate(27 8)">
              <mask id="cdn-d" fill="#fff">
                <polygon points="33 0 61.579 16.5 61.579 49.5 33 66 4.421 49.5 4.421 16.5"></polygon>
              </mask>
              <polygon points="33 0 61.579 16.5 61.579 49.5 33 66 4.421 49.5 4.421 16.5" fill="#C4E7FF"></polygon>
              <polygon fill="#A1D0F1" points="61.5 -16.5 90.079 0 90.079 33 61.5 49.5 32.921 33 32.921 0" mask="url(#cdn-d)"></polygon>
            </g>
            <g transform="translate(38 19)">
              <mask id="cdn-f" fill="#fff">
                <polygon points="22 0 41.053 11 41.053 33 22 44 2.947 33 2.947 11"></polygon>
              </mask>
              <polygon points="22 0 41.053 11 41.053 33 22 44 2.947 33 2.947 11" fill="#FFF"></polygon>
              <polygon fill="#78C8FF" points="22 -22 41.053 -11 41.053 11 22 22 2.947 11 2.947 -11" mask="url(#cdn-f)"></polygon>
              <polygon fill="#006EBB" points="3 11 22.053 22 22.053 44 3 55 -16.053 44 -16.053 22" mask="url(#cdn-f)"></polygon>
              <polygon fill="#34A1EC" points="41 11 60.053 22 60.053 44 41 55 21.947 44 21.947 22" mask="url(#cdn-f)"></polygon>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
