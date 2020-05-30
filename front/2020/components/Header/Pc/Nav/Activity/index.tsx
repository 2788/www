import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Activity() {
  return (
    <ItemWithOverlay overlay={<Overlay />}>活动与合作</ItemWithOverlay>
  )
}
