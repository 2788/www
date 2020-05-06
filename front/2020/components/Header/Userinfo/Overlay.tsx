import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuItem } from '../../UI/Dropdown'

import style from './style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><Link href=""><a>退出当前账号</a></Link></DropdownMenuItem>
    </DropdownMenu>
  )
}
