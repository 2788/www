import React from 'react'
import Positioned from '../Positioned'
import { Node } from '..'
import Line from '../Line'
import DataAnalyserIcon from '../icons/machine/DataAnalyser'

export default function DataAnalyser() {
  return (
    <>
      <Line3ToSelf />
      <Positioned identity={Node.DataAnalyser} top={75} left={1008}>
        <svg width="120" height="140" viewBox="0 0 120 140">
          <DataAnalyserIcon />
        </svg>
      </Positioned>
    </>
  )
}

function Line3ToSelf() {
  return (
    <Positioned left={828} top={125}>
      <Line width={146} />
    </Positioned>
  )
}
