import React, { PropsWithChildren } from 'react'

import style from './index.less'

export default function Card(props: PropsWithChildren<{ title: string, price: string }>) {
  const { children, title, price } = props

  return (
    <div className={style.card}>
      <div className={style.title}>{title}</div>
      {children}
      <div className={style.footer}><span className={style.price}>{price}</span> 元</div>
    </div>
  )
}

export function CardGroup({ children, title }: PropsWithChildren<{ title: string }>) {
  return (
    <ul>
      <div className={style.groupTitle}>{title}</div>
      {children}
    </ul>
  )
}

export function CardItem({ children, unit }: PropsWithChildren<{ unit?: string }>) {
  return <li className={style.item}>{children}<span className={style.unit}>{unit}</span></li>
}
