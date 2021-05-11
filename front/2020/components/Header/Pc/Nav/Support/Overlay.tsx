import React from 'react'
import { DropdownMenu, DropdownMenuItemLink } from 'components/UI/Dropdown'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItemLink href="https://developer.qiniu.com/" target="_self">开发文档</DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://support.qiniu.com" target="_self">技术支持</DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://segmentfault.com/qiniu?ref=portal.qiniu.com" target="_self">问答社区</DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://support.qiniu.com/tickets" target="_self">工单系统</DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://status.qiniu.com" target="_self">服务健康状态</DropdownMenuItemLink>
    </DropdownMenu>
  )
}
