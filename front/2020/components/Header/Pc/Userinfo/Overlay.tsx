import React from 'react'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'

import style from './style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><a href="https://sso.qiniu.com/signout">退出当前账号</a></DropdownMenuItem>
    </DropdownMenu>
  )
}
