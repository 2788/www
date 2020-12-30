import React from 'react'
import Link from 'components/Link'
import { DropdownMenu, DropdownMenuItem } from 'components/UI/Dropdown'
import { Activity, urlMap } from 'constants/activity'

import style from '../style.less'

export default function Overlay() {
  return (
    <DropdownMenu className={style.dropdown}>
      <DropdownMenuItem><a href="https://blog.qiniu.com/">七牛资讯</a></DropdownMenuItem>
      <DropdownMenuItem><Link href={urlMap[Activity.Main]}>开发者活动</Link></DropdownMenuItem>
    </DropdownMenu>
  )
}
