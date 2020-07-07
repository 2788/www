import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import Line from '../Line'
import style from '../index.less'
import { Node } from '..'

export default function MachineDataAnalysisPlat() {
  return (
    <>
      <Line1ToSelf />
      <Link2ToSelf />
      <Positioned identity={Node.MachineDataAnalysisPlat} top={75} left={655} zIndex={1}>
        <svg width="144" height="141" viewBox="0 0 144 141">
          <g fill="none">
            <Link className={style.link} href="/products/pandora">
              <g transform="translate(0 109)">
                <rect width="144" height="32" fill="#E0F7FF"></rect>
                <text fill="#00AAE7">
                  <tspan x="17" y="21">机器数据分析平台</tspan>
                </text>
              </g>
            </Link>
            <polygon fill="#C2E7FF" points="13 60.857 73 96.498 133 60.857 73 28"></polygon>
            <g transform="translate(78)">
              <polygon fill="#006EBB" points="0 6.571 12 11.571 12 61.714 0 54.343"></polygon>
              <polygon fill="#34A1EC" points="12 6.571 24 4.571 24 61.714 12 54.343" transform="matrix(-1 0 0 1 36 0)"></polygon>
              <polygon fill="#78C8FF" points="0 6.571 12 13.7 24 6.571 12 0"></polygon>
            </g>
            <g transform="translate(62 23)">
              <polygon fill="#006EBB" points="0 6.571 12 10.571 12 47.714 0 40.343"></polygon>
              <polygon fill="#34A1EC" points="12 6.571 24 10.571 24 47.714 12 40.343" transform="matrix(-1 0 0 1 36 0)"></polygon>
              <polygon fill="#78C8FF" points="0 6.571 12 13.7 24 6.571 12 0"></polygon>
            </g>
            <g transform="translate(46 47)">
              <polygon fill="#006EBB" points="0 6.571 12 6.571 12 33.714 0 26.343"></polygon>
              <polygon fill="#34A1EC" points="12 6.571 24 6.571 24 33.714 12 26.343" transform="matrix(-1 0 0 1 36 0)"></polygon>
              <polygon fill="#78C8FF" points="0 6.571 12 13.7 24 6.571 12 0"></polygon>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}

function Line1ToSelf() {
  return (
    <Positioned left={161} top={25}>
      <svg width="574px" height="108px" viewBox="0 0 574 108">
        <g id="首页" stroke="none" strokeWidth="1" fill="none">
          <g id="首页-云产品" transform="translate(-556.000000, -247.000000)" fill="#AEE1F3">
            <g id="云产品">
              <g id="编组-75" transform="translate(395.000000, 248.000000)">
                <path id="直线-2" d="M729,-0.462547892 L729,16.953 L735,16.9534124 L728,30.9534124 L721,16.9534124 L727,16.953 L727,1.537 L200.483,1.537 L200.483444,106.5 L161,106.5 L161,104.5 L198.483,104.499 L198.483444,-0.462547892 L729,-0.462547892 Z"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Positioned>
  )
}

function Link2ToSelf() {
  return (
    <Positioned left={494} top={125}>
      <Line width={146} />
    </Positioned>
  )
}

