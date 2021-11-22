/**
 * @file 方案页应用场景中的“相关产品”模块
 * @description 用于解决方案页应用场景导流到相关的产品
 */

import React, { PropsWithChildren, ReactNode, HTMLAttributes } from 'react'
import cls from 'classnames'
import { chunk } from 'lodash'
import { RightIcon } from 'react-icecream-2/lib/icons'
import { Product, urlMap, nameMap } from 'constants/products'
import { useMobile } from 'hooks/ua'
import Link from 'components/Link'
import { useIsShadow } from 'components/Product/Scene/utils'
import { useIsGrey } from 'components/Product/Section'
import ProductIcon from 'components/Product/Icon'

import style from './style.less'

export type Props = PropsWithChildren<{ size?: number }>

const Row = (props: HTMLAttributes<HTMLElement>) => (
  <div className={style.row} {...props} />
)

export default function Related({ size = 2, children }: Props) {
  const childrenArr = React.Children.toArray(children)
  const isMobile = useMobile()
  size = isMobile ? 1 : size
  // 不为size的倍数则补齐
  while (childrenArr.length % size !== 0) {
    childrenArr.push(<InvisibleItem key={childrenArr.length} />)
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
  return <div className={cls(style.itemWrapper, style.invisible)} />
}

export type ItemProps = PropsWithChildren<{
  icon: ReactNode
  href?: string
}>

export function Item({ icon, href, children }: ItemProps) {
  const isGrey = useIsGrey()
  const isShadow = useIsShadow()
  const isMobile = useMobile()
  const iconView = <div className={style.iconContainer}>{icon}</div>
  const hasHref = href !== undefined
  const wrapperClassName = cls(
    style.itemWrapper,
    hasHref && style.link,
    // 根据外部的 section 和 block 的背景色，决定 item 的背景色是否为白色
    !isShadow && isGrey && style.white
  )
  if (!hasHref) {
    return (
      <div className={wrapperClassName}>
        {iconView}
        <span className={style.content}>{children}</span>
      </div>
    )
  }
  return (
    <Link className={wrapperClassName} href={href}>
      {iconView}
      <div className={style.content}>{children}</div>
      {isMobile && <RightIcon className={style.rightIcon} />}
    </Link>
  )
}

export type ProductItemProps = {
  product: Product
  // 自定义名称
  name?: string
}

export function ProductItem({ product, name }: ProductItemProps) {
  const iconView = <ProductIcon product={product} />
  const href = urlMap[product] || undefined
  name = name ?? nameMap[product]
  return (
    <Item icon={iconView} href={href}>
      {name}
    </Item>
  )
}