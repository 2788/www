import React from 'react'
import Link from 'components/Link'
import Positioned from '../Positioned'
import Line from '../Line'
import style from '../index.less'
import { Node } from '..'
import MachineDataAnalysisPlatIcon from '../icons/machine/MachineDataAnalysisPlat'

export default function MachineDataAnalysisPlat() {
  return (
    <>
      <Line1ToSelf />
      <Link2ToSelf />
      <Positioned identity={Node.MachineDataAnalysisPlat} top={65} left={655} zIndex={1}>
        <svg width="144" height="151" viewBox="0 0 144 151">
          <MachineDataAnalysisPlatIcon />
          <Link className={style.link} href="/products/pandora">
            <g transform="translate(0 119)">
              <rect width="144" height="32" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="17" y="21">机器数据智能</tspan>
              </text>
            </g>
          </Link>
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

