import React from 'react'
import { DropdownMenu, DropdownMenuItemLink } from 'components/UI/Dropdown'
import { Activity, urlMap } from 'constants/activity'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItemLink href="https://blog.qiniu.com/" target="_self">七牛资讯</DropdownMenuItemLink>
      <DropdownMenuItemLink href={urlMap[Activity.Main]}>开发者活动</DropdownMenuItemLink>
    </DropdownMenu>
  )
}
