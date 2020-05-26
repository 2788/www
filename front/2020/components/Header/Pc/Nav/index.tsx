import React from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Product from './Product'
import Developer from './Developer'
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
      <Link href="/case"><a className={classnames(pathname === '/case' && 'active')}>客户</a></Link>
      <Support />
      <Activity />
      <Developer />
      <About />
    </nav>
  )
}
