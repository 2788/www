import React from 'react'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function About() {
  return (
    <ItemWithOverlay overlay={<Overlay />}>关于我们</ItemWithOverlay>
  )
}