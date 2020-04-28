/**
 * @file 顶部导航栏
 * @description 包含产品、解决方案、登录入口，及用户信息等内容
 */

import React from 'react'
import Link from 'next/link'
import Logo from './logo.svg'

import style from './style.less'

export default function Header() {
  return (
    <header className={style.wrapper}>
      <nav className={style.content}>
        <Logo />
        <ProductLinks />
      </nav>
    </header>
  )
}

/** 产品链接 */
function ProductLinks() {
  return (
    <ul>
      <li>
        <Link href="/products/kodo">
          <a>Kodo</a>
        </Link>
      </li>
    </ul>
  )
}
