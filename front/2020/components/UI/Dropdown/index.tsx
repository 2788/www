import React, { PropsWithChildren, HTMLAttributes } from 'react'
import RcDropdown from 'rc-dropdown/lib/Dropdown'

import 'rc-dropdown/assets/index.css'
import style from './index.less'

export default RcDropdown
export * from 'rc-dropdown/lib/Dropdown'

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
