import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuItem } from '../../../UI/Dropdown'
import Hot from '../Hot'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><Link href="https://developer.qiniu.com"><a>开发者中心</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>技术博客</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>UCUG技术大会</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>工具/插件/SDK合作 <Hot /></a></Link></DropdownMenuItem>
    </DropdownMenu>
  )
}
