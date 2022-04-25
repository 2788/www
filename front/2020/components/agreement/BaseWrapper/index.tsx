import React, { ReactNode } from 'react'
import { Router, withRouter } from 'next/router'

import Link from 'components/Link'

import style from './style.less'

export type Link = {
  href: string
  text: string
}

type BaseWrapperProps = {
  links: Link[]
  router: Router
  children: ReactNode
}

const BaseWrapper = (props: BaseWrapperProps) => {
  const links = props.links
  const router = props.router
  const children = props.children
  return (
    <div className={style.wrapper}>
      <div className={style.left} />
      <div className={style.container}>
        <ul className={style.header}>
          {
            links.map(
              link => (
                <li className={router.pathname === link.href ? style.active : ''} key={link.href}>
                  <Link className={style.link} href={link.href}>{link.text}</Link>
                </li>
              )
            )
          }
        </ul>
        {children}
      </div>
      <div className={style.right} />
    </div>

  )
}

export default withRouter(BaseWrapper)
