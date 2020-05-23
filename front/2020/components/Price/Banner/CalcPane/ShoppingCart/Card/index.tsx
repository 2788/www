import React, { PropsWithChildren } from 'react'

import DeleteIcon from './delete.svg'
import style from './index.less'

export type CardProps = PropsWithChildren<{
  title: string
  price: string
  index: number
  onDelete(idx: number): void
}>

export default function Card(props: CardProps) {
  const { children, title, price, index, onDelete } = props

  return (
    <div className={style.card}>
      <div className={style.title}>
        {title}
        <span title="删除"><DeleteIcon className={style.delete} onClick={() => onDelete(index)} /></span>
      </div>
      {children}
      <div className={style.footer}>
        <span className={style.price}>{price}</span> 元
      </div>
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
  return (
    <li className={style.item}>
      {children}
      <span className={style.unit}>{unit}</span>
    </li>
  )
}
