import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Developer() {
  return (
    <ItemWithOverlay overlay={<Overlay />}>开发者</ItemWithOverlay>
  )
}
