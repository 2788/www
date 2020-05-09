import React, { PropsWithChildren } from 'react'
import RcDropdown from 'rc-dropdown/lib/Dropdown'

import style from './index.less'

import 'rc-dropdown/assets/index.css'

export default RcDropdown
export * from 'rc-dropdown/lib/Dropdown'

export const DropdownMenu = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
  <ul className={className + ' ' + style.menu}>{children}</ul>
)

export const DropdownMenuItem = ({ children }: PropsWithChildren<{}>) => <li className={style.item}>{children}</li>

export function DropdownMenuGroup({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <li className={style.group}>
      <div className={style.groupTitle}>{title}</div>
      <ul>{children}</ul>
    </li>
  )
}
