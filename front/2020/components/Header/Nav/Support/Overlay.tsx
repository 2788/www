import React from 'react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuItem } from '../../../UI/Dropdown'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><Link href=""><a>开发文档</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href="https://support.qiniu.com"><a>技术支持</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>问答社区</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href=""><a>工单系统</a></Link></DropdownMenuItem>
      <DropdownMenuItem><Link href="https://status.qiniu.com"><a>服务健康状态</a></Link></DropdownMenuItem>
    </DropdownMenu>
  )
}
