/**
 * @file 代表某个产品的标签
 * @description 由产品图标 + 名称组成，点击可跳转到对应的产品页
 */

import cls from 'classnames'
import React from 'react'
import { Product, nameMap, urlMap } from 'constants/products'
import Link from 'components/Link'
import ProductIcon from '../Icon'

import style from './style.less'

export type Props = {
  product: Product
  className?: string
}

export default function ProductTag({ product, className }: Props) {
  const name = nameMap[product]
  const url = urlMap[product]
  className = cls(style.tag, className)

  const content = (
    <>
      <ProductIcon product={product} className={style.icon} />
      {name}
    </>
  )

  if (url == null) {
    return <span className={className}>{content}</span>
  }

  return (
    <Link className={className} href={url}>{content}</Link>
  )
}
