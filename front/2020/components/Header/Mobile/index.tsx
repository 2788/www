import React from 'react'
import Link from 'next/link'

import Logo from '../logo.svg'
import style from './style.less'
import Userinfo from './Userinfo'
import Search from './Search'
import Nav from './Nav'

export default function HeaderForMobile() {
  return (
    <div className={style.header}>
      <Link href="/"><a className={style.logo}><Logo /></a></Link>
      <div className={style.spacer} />
      <Search />
      <Userinfo />
      <Nav />
    </div>
  )
}
