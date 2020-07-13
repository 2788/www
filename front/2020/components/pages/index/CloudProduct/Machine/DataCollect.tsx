import React from 'react'
import Positioned from '../Positioned'
import Line from '../Line'
import { Node } from '..'
import DataCollectIcon from '../icons/machine/DataCollect'

// 数据采集 数据解析 数据分析
export default function DataCollect() {
  return (
    <>
      <Positioned identity={Node.DataCollect} top={149} left={188}>
        <svg width="120" height="167" viewBox="0 0 120 167">
          <DataCollectIcon />
          <g fill="none">
            <g transform="translate(0 119)">
              <rect width="120" height="48" fill="#E0F7FF"></rect>
              <text fill="#00AAE7">
                <tspan x="32" y="19">数据采集</tspan>
                <tspan x="39.665" y="39">Logkit</tspan>
              </text>
            </g>
          </g>
        </svg>
      </Positioned>
      <Positioned top={220} left={135}><Line width={26} /></Positioned>
    </>
  )
}
