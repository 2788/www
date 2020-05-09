/**
 * @file 顶部导航栏
 * @description 包含产品、解决方案、登录入口，及用户信息等内容
 */

import React from 'react'
import Link from 'next/link'

import SearchInput from './Search'
import Userinfo from './Userinfo'
import Nav from './Nav'
import Button from '../../UI/Button'

import Logo from '../logo.svg'
import style from './style.less'

export default function HeaderForPc() {
  return (
    <header className={style.header}>
      <div className={style.content}>
        <Link href=""><a className={style.logo}><Logo /></a></Link>
        <Nav />
        <SearchInput />
        <Userinfo />
        <Button type="primary" size="small" href="/TODO/" style={{ width: '94px' }}>管理控制台</Button>
      </div>
    </header>
  )
}
