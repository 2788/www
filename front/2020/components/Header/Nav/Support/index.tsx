import React from 'react'
import Dropdown from '../../../UI/Dropdown'
import Overlay from './Overlay'

export default function Support() {
  return <Dropdown align={{ offset: [0, 0] }} overlay={Overlay}><a>服务与支持</a></Dropdown>
}
