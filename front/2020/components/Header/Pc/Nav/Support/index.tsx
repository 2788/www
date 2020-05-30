import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Support() {
  return (
    <ItemWithOverlay overlay={<Overlay />}>服务与支持</ItemWithOverlay>
  )
}
