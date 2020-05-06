import React from 'react'
import Dropdown from '../../../UI/Dropdown'
import Overlay from './Overlay'

export default function Activity() {
  return <Dropdown align={{ offset: [0, 0] }} overlay={Overlay}><a>活动与合作</a></Dropdown>
}
