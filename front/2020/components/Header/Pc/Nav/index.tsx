import React, { PropsWithChildren, ReactElement, useRef, useState } from 'react'
import classnames from 'classnames'
import { Product, priceUrlMap } from 'constants/products'
import Link from 'components/Link'

import ProductComponent from './Product'
import style from './style.less'
import About from './About'
import Support from './Support'
import Solution from './Solution'
import Partner from './Partner'
import DropdownForHeader from '../Dropdown'

export default function Nav() {
  return (
    <nav className={style.nav}>
      <ItemWithLink href="https://marketing.qiniu.com/activity/all?entry=index-advert">最新活动</ItemWithLink>
      <ProductComponent />
      <Solution />
      <ItemWithLink href="https://qmall.qiniu.com/">云商城</ItemWithLink>
      <ItemWithLink href={priceUrlMap[Product.Kodo]}>定价</ItemWithLink>
      <Support />
      <Partner />
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
  const [active, setActive] = useState(visible || false)
  return (
    <div ref={ref} className={style.item}>
      <DropdownForHeader
        visible={visible}
        align={{ offset: [offsetX, -1] }}
        overlay={overlay}
        overlayClassName={style.overlay}
        onVisibleChange={setActive}
      >
        <a className={classnames(style.itemText, active && 'active')}>{children}</a>
      </DropdownForHeader>
    </div>
  )
}

type ItemLinkProps = PropsWithChildren<{
  href: string
}>

export function ItemWithLink({ href, children }: ItemLinkProps) {
  const linkClassName = classnames(style.itemText, style.link)
  return (
    <div className={style.item}>
      <Link href={href} className={linkClassName}>{children}</Link>
    </div>
  )
}
