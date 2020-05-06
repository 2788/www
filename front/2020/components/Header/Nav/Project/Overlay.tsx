import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuItem } from '../../../UI/Dropdown'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><Link href="https://www.qiniu.com/products/kodo"><a>对象存储</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>归档存储</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>大数据（存储）解决方案超出效果</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href="https://www.qiniu.com/products/vcs"><a>视频冷存储解决方案</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>监控视频边缘存储方案</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>技术博客</a></Link></DropdownMenuItem>
    </DropdownMenu>
  )
}
