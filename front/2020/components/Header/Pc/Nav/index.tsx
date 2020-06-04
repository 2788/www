import React, { PropsWithChildren, ReactElement, useRef } from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import Dropdown from 'components/UI/Dropdown'
import Link from 'components/Link'

import Product from './Product'
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
      <ItemWithLink href="/case">客户</ItemWithLink>
      <Support />
      <Activity />
      <ItemWithLink href="https://blog.qiniu.com/">七牛资讯</ItemWithLink>
      <About />
    </nav>
  )
}

type ItemWithOverlayProps = PropsWithChildren<{
  visible?: boolean
  overlay: ReactElement
  overlayOffsetX?: number
}>

export function ItemWithOverlay({ visible, overlay, overlayOffsetX, children }: ItemWithOverlayProps) {
  const offsetX = overlayOffsetX != null ? overlayOffsetX : 0
  const ref = useRef(null)
  return (
    <div ref={ref} className={style.item}>
      <Dropdown
        visible={visible}
        align={{ offset: [offsetX, -1] }}
        getPopupContainer={() => ref.current || window.document.body}
        overlay={overlay}
      >
        <a className={style.itemText}>{children}</a>
      </Dropdown>
    </div>
  )
}

type ItemLinkProps = PropsWithChildren<{
  href: string
}>

export function ItemWithLink({ href, children }: ItemLinkProps) {
  const { pathname } = useRouter()
  const linkClassName = classnames(style.itemText, href === pathname && 'active')
  return (
    <div className={style.item}>
      <Link href={href} className={linkClassName}>{children}</Link>
    </div>
  )
}
