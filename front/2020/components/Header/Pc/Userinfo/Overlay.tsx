import React from 'react'
import { useUrl } from 'hooks/url'
import { urlForSignout } from 'utils/route'
import { DropdownMenu, DropdownMenuItemLink } from 'components/UI/Dropdown'

import style from './style.less'

export default function Overlay() {
  const currentUrl = useUrl()
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItemLink href="https://portal.qiniu.com/user/profile">
        个人中心
        <p>账号管理，实名认证</p>
      </DropdownMenuItemLink>
      <DropdownMenuItemLink href="https://portal.qiniu.com/financial/overview">
        财务中心
        <p>充值，开票，资源包管理</p>
      </DropdownMenuItemLink>
      <li className={style.divider}></li>
      <DropdownMenuItemLink href={urlForSignout(currentUrl)} target="_self">
        退出当前账号
      </DropdownMenuItemLink>
    </DropdownMenu>
  )
}
