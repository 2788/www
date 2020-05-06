import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuItem } from '../../../UI/Dropdown'
import Hot from '../Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><Link href="/company"><a>公司介绍 <Hot /></a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>客户案例</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href="/contact"><a>联系我们</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>最新动态</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href="https://career.qiniu.com/social"><a>招聘</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>技术博客</a></Link></DropdownMenuItem>
    </DropdownMenu>
  )
}
