import React from 'react'

import MediaData from './MediaData'
import SDK from './SDK'
import DataLake from './DataLake'
import CDN from './CDN'
import TernimalUser from './TernimalUser'
import Pili from './Pili'

export default function Media() {
  return (
    <>
      <MediaData />
      <SDK />
      <Pili />
      <DataLake />
      <CDN />
      <TernimalUser />
    </>
  )
}
