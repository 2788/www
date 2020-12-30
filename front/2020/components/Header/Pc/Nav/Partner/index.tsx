import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Partner() {
  return (
    <ItemWithOverlay overlay={<Overlay />}>合作伙伴</ItemWithOverlay>
  )
}
