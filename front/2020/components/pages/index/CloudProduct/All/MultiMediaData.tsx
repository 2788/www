import React from 'react'
import Positioned from '../Positioned'
import { Node } from '..'
import MultiMediaDataIcon from '../icons/media/MultiMediaData'

export default function MultiMediaData() {
  return (
    <Positioned identity={Node.MultiMediaData} top={415} left={0}>
      <svg width="120" height="141" viewBox="0 0 120 141">
        <MultiMediaDataIcon />
      </svg>
    </Positioned>
  )
}
