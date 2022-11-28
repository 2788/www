/**
 * @file 产品页 相关产品
 * @author tang <tangzhengwei01@qiniu.com>
 */

import React from 'react'

import { useMobile } from 'hooks/ua'
import Link from 'components/Link'
import { Row } from 'components/UI/Card'
import { LibIcon } from 'components/LibIcon'

import { ProductInfo } from 'apis/admin/product'
import IconArrow from './arrow.svg'
import style from './style.less'

export interface Props {
  /** 分别是 3 组、4 组、6 组 */
  productInfos: ProductInfo[]
}

export default function ProductRelated({ productInfos }: Props) {
  if (!productInfos.length) {
    return null
  }

  let itemsRow1: ProductInfo[] = [...productInfos]
  let itemsRow2: ProductInfo[] = []

  // 如果是 6 组，分两行展示
  if (productInfos.length === 6) {
    itemsRow1 = productInfos.slice(0, 3)
    itemsRow2 = productInfos.slice(3, 6)
  }

  return (
    <>
      <Row>
        {itemsRow1.map(item => <Item key={item.name} {...item} />)}
      </Row>

      {!!itemsRow2.length && (
        <Row>
          {itemsRow2.map(item => <Item key={item.name} {...item} />)}
        </Row>
      )}
    </>
  )
}

export function Item({ name, path, desc, icon }: ProductInfo) {
  const isMobile = useMobile()
  const productUrl = `/products/${path}`
  if (isMobile) {
    return (
      <Link className={style.mobileItemWrapper} href={productUrl}>
        <LibIcon alt="相关产品" src={icon.lineSmall} />
        <div className={style.content}>{name}</div>
        <div className={style.icon}>
          <IconArrow />
        </div>
      </Link>
    )
  }

  return (
    <div className={style.pcItemWrapper}>
      <div className={style.icon}>
        <LibIcon alt="相关产品" src={icon.lineSmall} />
      </div>
      <div className={style.content}>
        <h3 className={style.title}>{name}</h3>
        <p className={style.desc}>{desc.brief}</p>
        <Link className={style.link} href={productUrl}>查看更多 &gt;</Link>
      </div>
    </div>
  )
}
