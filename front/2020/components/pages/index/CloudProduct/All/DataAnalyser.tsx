import React from 'react'
import Positioned from '../share/Positioned'
import { Node } from '..'
import DataAnalyserIcon from '../icons/machine/DataAnalyser'

export default function DataAnalyser() {
  return (
    <Positioned identity={Node.DataAnalyser} top={75} left={1008}>
      <svg width="120" height="140" viewBox="0 0 120 140">
        <DataAnalyserIcon />
      </svg>
    </Positioned>
  )
}
