/**
 * @file 解决方案页“相关产品”模块
 * @description 用于解决方案页导流到相关的产品
 */

import React, { PropsWithChildren, ReactNode } from 'react'
import { Product, urlMap, nameMap } from 'constants/products'
import { useMobile } from 'hooks/ua'
import Link from 'components/Link'
import { Row, Card } from 'components/UI/Card'
import ProductIcon from 'components/Product/Icon'

import IconArrow from './arrow.svg'
import style from './style.less'

export type Props = PropsWithChildren<{}>

export default function Related({ children }: Props) {
  return <Row>{children}</Row>
}

export type ItemProps = PropsWithChildren<{
  icon: ReactNode
  href: string
}>

export function Item({ icon, href, children }: ItemProps) {
  const isMobile = useMobile()
  return (
    <Card>
      <Link className={style.wrapper} href={href}>
        <div className={style.icon}>{icon}</div>
        <div className={style.content}>{children}</div>
        {isMobile && <IconArrow />}
      </Link>
    </Card>
  )
}

export type ProductItemProps = {
  product: Product
}

export function ProductItem({ product }: ProductItemProps) {
  const iconView = <ProductIcon product={product} />
  const href = urlMap[product] || '#'
  const name = nameMap[product]
  return (
    <Item icon={iconView} href={href}>
      {name}
    </Item>
  )
}
