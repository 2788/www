/**
 * @file 新解决方案页“相关产品”模块
 * @description 用于解决方案页导流到相关的产品
 */

import React, { PropsWithChildren, ReactNode } from 'react'
import { chunk } from 'lodash'
import { Product, urlMap, nameMap, descMap } from 'constants/products'
import { useMobile } from 'hooks/ua'
import Link from 'components/Link'
import { Row, Card, InvisibleCard } from 'components/UI/Card'
import ProductIcon from 'components/Product/Icon'

import IconArrow from './arrow.svg'
import style from './style.less'

export type Props = PropsWithChildren<{}>

export default function Related({ children }: Props) {
  const childrenArr = React.Children.toArray(children)
  // 一行最少为3，最多为4
  const size = Math.min(Math.max(childrenArr.length, 3), 4)
  // 不为size的倍数则补齐
  while (childrenArr.length % size !== 0) {
    childrenArr.push(<InvisibleItem />)
  }
  return (
    <>
      {
        chunk(childrenArr, size).map((group, i) => (
          <Row key={i}>{group}</Row>
        ))
      }
    </>
  )
}

export function InvisibleItem() {
  const isMobile = useMobile()
  if (isMobile) {
    return null
  }
  return <InvisibleCard className={style.invisibleCard} />
}

export type ItemProps = PropsWithChildren<{
  icon: ReactNode
  href: string
  desc: string
}>

export function Item({ icon, href, desc, children }: ItemProps) {
  const isMobile = useMobile()
  if (isMobile) {
    return (
      <Card>
        <Link className={style.wrapper} href={href}>
          {icon}
          <div className={style.content}>{children}</div>
          <IconArrow />
        </Link>
      </Card>
    )
  }
  return (
    <Card className={style.card}>
      {icon}
      <div className={style.title}>{children}</div>
      <div className={style.content}>{desc}</div>
      <Link className={style.link} href={href}>查看更多 &gt;&gt;</Link>
    </Card>
  )
}

export type ProductItemProps = {
  product: Product
  // 自定义名称
  name?: string
  // 自定义描述
  desc?: string
}

export function ProductItem({ product, name, desc }: ProductItemProps) {
  const iconView = <ProductIcon product={product} small />
  const href = urlMap[product] || '#'
  // eslint-disable-next-line no-underscore-dangle
  const _name = name || nameMap[product]
  return (
    <Item icon={iconView} href={href} desc={desc || descMap[product]}>
      {_name}
    </Item>
  )
}
