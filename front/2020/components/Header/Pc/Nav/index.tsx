import React from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import Link from 'components/Link'

import Product from './Product'
import style from './style.less'
import About from './About'
import Support from './Support'
import Project from './Project'
import Activity from './Activity'

export default function Nav() {
  const { pathname } = useRouter()

  return (
    <nav className={style.nav}>
      <Product />
      <Project />
      <Link href="/case" className={classnames(pathname === '/case' && 'active')}>客户</Link>
      <Support />
      <Activity />
      <Link href="https://blog.qiniu.com/">七牛资讯</Link>
      <About />
    </nav>
  )
}
