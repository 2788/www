import React from 'react'
import { DropdownMenu, DropdownMenuItemLink, DropdownMenuGroup } from 'components/UI/Dropdown'
import Hot from 'components/Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuGroup title="推广返现">
        <DropdownMenuItemLink href="/cps">新推官 CPS 推广返现</DropdownMenuItemLink>
      </DropdownMenuGroup>
      <DropdownMenuGroup title="合作伙伴">
        <DropdownMenuItemLink href="/partner">合作伙伴与生态</DropdownMenuItemLink>
      </DropdownMenuGroup>
      <DropdownMenuGroup title="市场活动">
        <DropdownMenuItemLink href="/cooperations">工具插件 SDK 合作 <Hot /></DropdownMenuItemLink>
      </DropdownMenuGroup>
    </DropdownMenu>
  )
}
