import React from 'react'

import Link from 'components/Link'

import { Props } from '..'
import ArrowRightIcon from './arrow-right.svg'
import style from './style.less'

export default function Mobile({ items }: Props) {
  return (
    <ul className={style.demoWrapper}>
      {items.map((item, index) => (
        <li key={index} className={style.itemWrapper}>
          <Link href={item.demoUrl} rel="noopener" target="_blank" className={style.item}>
            {item.desc} <ArrowRightIcon />
          </Link>
        </li>
      ))}
    </ul>
  )
}
