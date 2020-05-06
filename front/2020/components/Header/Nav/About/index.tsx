import React from 'react'
import Dropdown from '../../../UI/Dropdown'
import Overlay from './Overlay'

export default function About() {
  return <Dropdown align={{ offset: [0, 0] }} overlay={Overlay}><a>关于我们</a></Dropdown>
}
