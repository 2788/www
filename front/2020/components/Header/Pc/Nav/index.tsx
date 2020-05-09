import React from 'react'
import Link from 'next/link'

import Product from './Product'
import Developer from './Developer'
import style from './style.less'
import About from './About'
import Support from './Support'
import Project from './Project'
import Activity from './Activity'

export default function Nav() {
  return (
    <nav className={style.nav}>
      <Product />
      <Project />
      <Link href="TODO"><a>客户</a></Link>
      <Support />
      <Activity />
      <Developer />
      <About />
    </nav>
  )
}
