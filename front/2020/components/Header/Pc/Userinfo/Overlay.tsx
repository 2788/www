import React from 'react'
import { useUrl } from 'hooks/url'
import { urlForSignout } from 'utils/route'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'

import style from './style.less'

export default function Overlay() {
  const currentUrl = useUrl()
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><a href={urlForSignout(currentUrl)}>退出当前账号</a></DropdownMenuItem>
    </DropdownMenu>
  )
}
