import React from 'react'
import Positioned from '../share/Positioned'
import { Node } from '..'
import DataAnalyserIcon from '../icons/machine/DataAnalyser'

export default function DataAnalyser() {
  return (
    <>
      <Positioned identity={Node.DataAnalyser} top={159} left={1008}>
        <svg width="120" height="140" viewBox="0 0 120 140">
          <DataAnalyserIcon />
          <g fill="none">
            <g transform="translate(0 108)">
              <rect width="120" height="32" fill="#DEE9FF" rx="16"></rect>
              <text fill="#2B65D6">
                <tspan x="25" y="21">数据分析师</tspan>
              </text>
            </g>
          </g>
        </svg>
      </Positioned>
    </>
  )
}
