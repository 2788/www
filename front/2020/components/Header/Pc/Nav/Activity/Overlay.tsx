import React from 'react'
import Link from 'components/Link'
import { DropdownMenu, DropdownMenuItem, DropdownMenuGroup } from 'components/UI/Dropdown'
import Hot from 'components/Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuGroup title="推广返现">
        <DropdownMenuItem><Link href="/cps">新推官 CPS 推广返现</Link></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuGroup title="合作伙伴">
        <DropdownMenuItem><Link href="/partner">合作伙伴与生态</Link></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuGroup title="市场活动">
        <DropdownMenuItem><Link href="/cooperations">工具插件 SDK 合作 <Hot /></Link></DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
