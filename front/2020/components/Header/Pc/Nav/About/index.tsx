import React, { useRef } from 'react'
import Dropdown from 'components/UI/Dropdown'
import Overlay from './Overlay'

export default function About() {
  const ref = useRef(null)
  return (
    <Dropdown
      align={{ offset: [0, -1] }}
      getPopupContainer={() => ref.current || window.document.body}
      overlay={() => <Overlay />}
    >
      <a ref={ref}>关于我们</a>
    </Dropdown>
  )
}
