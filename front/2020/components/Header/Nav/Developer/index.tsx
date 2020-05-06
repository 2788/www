import React from 'react'
import Dropdown from '../../../UI/Dropdown'
import Overlay from './Overlay'

export default function Developer() {
  return <Dropdown align={{ offset: [0, 0] }} overlay={Overlay}><a>开发者</a></Dropdown>
}
