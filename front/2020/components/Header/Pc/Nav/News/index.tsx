import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function News() {
  return (
    <ItemWithOverlay overlay={<Overlay />}>活动与资讯</ItemWithOverlay>
  )
}
