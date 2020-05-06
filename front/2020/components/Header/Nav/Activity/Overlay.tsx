import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuItem, DropdownMenuGroup } from '../../../UI/Dropdown'
import Hot from '../Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuGroup title="运营活动">
        <DropdownMenuItem><Link href="/products/qvm/partner"><a>云主机合伙人计划</a></Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/products/kodo/goglobal"><a>出海企业扶持</a></Link></DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuGroup title="市场活动">
        <DropdownMenuItem><Link href=""><a>邀请好友 <Hot /></a></Link></DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
