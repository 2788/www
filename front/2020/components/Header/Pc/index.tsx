/**
 * @file 顶部导航栏
 * @description 包含产品、解决方案、登录入口，及用户信息等内容
 */

import React from 'react'
import Link from 'next/link'

import SearchInput from './Search'
import Userinfo from './Userinfo'
import Nav from './Nav'

import Logo from '../logo.svg'
import style from './style.less'

export default function HeaderForPc() {
  return (
    <header className={style.header}>
      <div className={style.content}>
        <Link href="/"><a className={style.logo}><Logo /></a></Link>
        <Nav />
        <SearchInput />
        <div className={style.space}></div>
        <Userinfo />
      </div>
    </header>
  )
}
