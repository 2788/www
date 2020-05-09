import React, { useRef } from 'react'
import Dropdown from 'components/UI/Dropdown'
import Overlay from './Overlay'

export default function Product() {
  const ref = useRef(null)

  return (
    <Dropdown
      align={{ offset: [-134, 0] }}
      getPopupContainer={() => ref.current || window.document.body}
      overlay={() => <Overlay />}
    >
      <a ref={ref}>产品</a>
    </Dropdown>
  )
}
