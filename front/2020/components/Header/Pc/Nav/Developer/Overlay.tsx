import React from 'react'
import { DropdownMenu, DropdownMenuItemLink } from 'components/UI/Dropdown'
import Hot from 'components/Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItemLink href="https://developer.qiniu.com" target="_self">开发者中心</DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://blog.qiniu.com/archives/category/5" target="_self">技术博客</DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://www.ecug.org/" target="_self">ECUG 技术大会</DropdownMenuItemLink>
      <DropdownMenuItemLink href="/cooperations">工具/插件/SDK合作 <Hot /></DropdownMenuItemLink>
    </DropdownMenu>
  )
}
