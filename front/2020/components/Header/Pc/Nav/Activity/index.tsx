import React, { useRef } from 'react'
import Dropdown from 'components/UI/Dropdown'
import Overlay from './Overlay'

export default function Activity() {
  const ref = useRef(null)
  return (
    <Dropdown
      align={{ offset: [0, 0] }}
      getPopupContainer={() => ref.current || window.document.body}
      overlay={() => <Overlay />}
    >
      <a ref={ref}>活动与合作</a>
    </Dropdown>
  )
}
