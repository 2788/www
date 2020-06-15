import React, { createElement, useState } from 'react'
import { useRouter } from 'next/router'
import { useGlobalModal } from 'hooks/scroll'
import BaseDropdown, { DropdownProps } from 'components/UI/Dropdown'
import { useOnChange } from 'hooks'
import Overlay from './Overlay'

export default function MobileDropdown({ overlay, children, ...rest }: DropdownProps) {
  // 内部组件，不处理 visible 和 defaultVisible
  const [visible, setVisible] = useState(false)

  useGlobalModal(visible)

  // 当路由发生变化时关闭浮层，考虑这往往是浮层中的交互行为导致站内跳转
  // 此时自动把浮层收起来比较合理
  const router = useRouter()
  const fullPath = router.asPath
  useOnChange(() => setVisible(false), [fullPath])

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
