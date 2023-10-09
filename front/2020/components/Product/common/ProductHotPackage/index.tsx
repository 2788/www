/**
 * @file 产品页 热销套餐
 * @author zzz <zhangzuzhou@qiniu.com>
 */

import React from 'react'

import { Raw } from 'components/Product/Feature/v2'

import { useMobile } from 'hooks/ua'

import PackageCard from './PackageCard'
import style from './style.less'

interface IntroductionProps {
  detail: string
}

interface ButtonProps {
  title: string
  url: string
}

export interface Item {
  title: string
  desc: string
  introductions?: IntroductionProps[]
  button: ButtonProps
  price: number
  tag: string
}

interface Props {
  items: Item[]
}

export default function ProductHotPackage({ items }: Props) {
  const isMobile = useMobile()

  if (!items.length) {
    return null
  }

  if (isMobile) {
    return (
      <div className={style.mobileWrapper}>
        {items.map(item => (
          <PackageCard {...item} key={item.title} />
        ))}
      </div>
    )
  }

  return (
    <Raw maxColumnsPerRow={4}>
      {items.map(item => (
        <PackageCard {...item} key={item.title} />
      ))}
    </Raw>
  )
}
