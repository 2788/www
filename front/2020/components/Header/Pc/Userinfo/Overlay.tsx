import React from 'react'
import { useUrl } from 'hooks/url'
import { urlForSignout } from 'utils/route'
import Link from 'components/Link'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'

import style from './style.less'

export default function Overlay() {
  const currentUrl = useUrl()
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem>
        <Link href="https://portal.qiniu.com/user/profile">
          个人中心
          <p>账号管理，实名认证</p>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="https://portal.qiniu.com/financial/overview">
          财务中心
          <p>充值，开票，资源包管理</p>
        </Link>
      </DropdownMenuItem>
      <li className={style.divider}></li>
      <DropdownMenuItem>
        <a href={urlForSignout(currentUrl)}>退出当前账号</a>
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
