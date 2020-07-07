import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Product() {
  return (
    <ItemWithOverlay overlay={<Overlay />} overlayOffsetX={-134}>产品</ItemWithOverlay>
  )
}