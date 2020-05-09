import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'
import Hot from '../Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><a href="https://developer.qiniu.com">开发者中心</a></DropdownMenuItem>
      <DropdownMenuItem><a href="https://blog.qiniu.com/archives/category/5">技术博客</a></DropdownMenuItem>
      <DropdownMenuItem><a href="https://www.ecug.org/">ECUG 技术大会</a></DropdownMenuItem>
      <DropdownMenuItem><Link href="TODO"><a>工具/插件/SDK合作 <Hot /></a></Link></DropdownMenuItem>
    </DropdownMenu>
  )
}
