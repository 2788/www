import React from 'react'
import Dropdown from '../../../UI/Dropdown'
import Overlay from './Overlay'

export default function Production() {
  return (
    <Dropdown align={{ offset: [-134, 0] }} overlay={() => <Overlay />}>
      <a className="active">产品</a>
    </Dropdown>
  )
}
