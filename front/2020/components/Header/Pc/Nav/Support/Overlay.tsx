import React from 'react'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><a href="https://developer.qiniu.com/">开发文档</a></DropdownMenuItem>
      <DropdownMenuItem><a href="https://support.qiniu.com">技术支持</a></DropdownMenuItem>
      <DropdownMenuItem><a href="https://segmentfault.com/qiniu?ref=portal.qiniu.com">问答社区</a></DropdownMenuItem>
      <DropdownMenuItem><a href="https://support.qiniu.com/tickets">工单系统</a></DropdownMenuItem>
      <DropdownMenuItem><a href="https://status.qiniu.com">服务健康状态</a></DropdownMenuItem>
    </DropdownMenu>
  )
}
