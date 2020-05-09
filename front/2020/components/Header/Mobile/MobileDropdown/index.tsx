import React, { createElement, useState } from 'react'
import BaseDropdown, { DropdownProps } from 'components/UI/Dropdown'
import Overlay from './Overlay'

export default function MobileDropdown({ overlay, children, ...rest }: DropdownProps) {
  // 内部组件，不处理 visible 和 defaultVisible
  const [visible, setVisible] = useState(false)
  return (
    <BaseDropdown
      align={{ offset: [0, -52] }}
      visible={visible}
      overlay={() => <Overlay onClose={() => setVisible(false)}>{createElement(overlay as any)}</Overlay>}
      {...rest}
    >
      <div onClick={() => setVisible(true)}>{children}</div>
    </BaseDropdown>
  )
}
