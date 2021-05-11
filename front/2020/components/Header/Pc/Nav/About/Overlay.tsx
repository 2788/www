import React from 'react'
import { DropdownMenu, DropdownMenuItemLink } from 'components/UI/Dropdown'
import Hot from 'components/Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItemLink href="https://campus.qiniu.com" target="_self">校园招聘 <Hot /></DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://career.qiniu.com/social" target="_self">社会招聘</DropdownMenuItemLink>
      <DropdownMenuItemLink href="/company">公司介绍</DropdownMenuItemLink>
      <DropdownMenuItemLink href="/contact">联系我们</DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://blog.qiniu.com/archives/category/1" target="_self">最新动态</DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://blog.qiniu.com/archives/category/5" target="_self">技术博客</DropdownMenuItemLink>
    </DropdownMenu>
  )
}
