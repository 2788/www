import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'
import Hot from 'components/Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><Link href="/company"><a>公司介绍 <Hot /></a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href="/contact"><a>联系我们</a></Link></DropdownMenuItem>
      <DropdownMenuItem><a href="https://blog.qiniu.com/archives/category/1">最新动态</a></DropdownMenuItem>
      <DropdownMenuItem><a href="https://career.qiniu.com/social">招聘</a></DropdownMenuItem>
      <DropdownMenuItem><a href="https://blog.qiniu.com/archives/category/5">技术博客</a></DropdownMenuItem>
    </DropdownMenu>
  )
}
