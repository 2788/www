import React, { PropsWithChildren, HTMLAttributes, useState, useCallback, cloneElement } from 'react'
import RcDropdown, { DropdownProps } from 'rc-dropdown/lib/Dropdown'
import useDelay from 'hooks/use-delay'

import 'rc-dropdown/assets/index.css'
import style from './index.less'

export * from 'rc-dropdown/lib/Dropdown'

// 给 Dropdown 增加类似 debounce 效果，防止滑过等误开其他 Dropdown
export default function Dropdown(props: DropdownProps & { delay?: number }) {
  const { visible: _visible, onVisibleChange: _onVisibleChange, delay = 50, ...rest } = props
  const [visible, setVisible] = useState(_visible || false)
  const delayObj = useDelay(delay)

  const onVisibleChange = useCallback((value: boolean) => {
    if (value === true) return

    setVisible(value)
    if (_onVisibleChange) {
      _onVisibleChange(value)
    }
  }, [_onVisibleChange])

  const children = cloneElement(props.children, {
    onMouseEnter() {
      delayObj.start(() => {
        setVisible(true)
      })
    },
    onMouseLeave() {
      if (visible === false) {
        delayObj.stop()
      }
    }
  })

  return <RcDropdown onVisibleChange={onVisibleChange} visible={visible} {...rest}>{children}</RcDropdown>
}
export const DropdownMenu = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
  <ul className={className + ' ' + style.menu}>{children}</ul>
)

export type DropdownMenuItemProps = HTMLAttributes<HTMLLIElement>

export function DropdownMenuItem({ className, ...others }: DropdownMenuItemProps) {
  className = [style.item, className].filter(Boolean).join(' ')
  return (
    <li className={className} {...others} />
  )
}

export function DropdownMenuGroup({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <li className={style.group}>
      <div className={style.groupTitle}>{title}</div>
      <ul>{children}</ul>
    </li>
  )
}
