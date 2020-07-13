import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import style from '../index.less'
import { Node } from '..'
import DataLakeIcon from '../icons/media/DataLake'

export default function DataLake() {
  return (
    <>
      <Positioned identity={Node.Kodo} top={527} left={470} zIndex={1}>
        <svg width="300" height="197" viewBox="0 0 300 197">
          <DataLakeIcon />
          <Link className={style.link} href="/products/kodo">
            <g transform="translate(180 70)">
              <rect width="120" height="32" fill="#E0F7FF"></rect>
              <text fill="#34A1EC">
                <tspan x="25" y="21">异构数据湖</tspan>
              </text>
            </g>
          </Link>
        </svg>
      </Positioned>
      <Background />
    </>
  )
}

function Background() {
  return (
    <Positioned top={525} left={188}>
      <svg width="724" height="176" viewBox="0 0 724 176">
        <defs>
          <filter id="异构数据湖-b" width="103%" height="105.1%" x="-1.5%" y="-2.5%" filterUnits="objectBoundingBox">
            <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation=".5"></feGaussianBlur>
            <feOffset dy="1" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite>
            <feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0   0 0 0 0 0.431372549   0 0 0 0 0.733333333  0 0 0 1 0"></feColorMatrix>
          </filter>
        </defs>
        <g fill="none">
          <path fill="#F2FCFF" d="M0,0 L724,0 L724,176 L0,176 L0,0 Z"></path>
        </g>
      </svg>
    </Positioned>
  )
}
