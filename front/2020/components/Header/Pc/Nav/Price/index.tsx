import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Price() {
  return (
    <ItemWithOverlay overlay={<Overlay />}>定价</ItemWithOverlay>
  )
}
