/**
 * @file 带 icon 的内容列表
 */

import cls from 'classnames'
import React, { ReactNode, PropsWithChildren } from 'react'
import IconHook from './hook.svg'
import style from './style.less'

export type ListProps = PropsWithChildren<{
  className?: string
}>

export function List(props: ListProps) {
  return <ul {...props} className={cls(style.list, props.className)} />
}

export type ItemProps = PropsWithChildren<{
  icon: ReactNode
  className?: string
}>

export function Item({ icon, children, className }: ItemProps) {
  return (
    <li className={cls(style.item, className)}>
      {icon}
      {children}
    </li>
  )
}

export type HookItemProps = PropsWithChildren<{
  className?: string
}>

export function HookItem(props: HookItemProps) {
  return <Item icon={<IconHook />} {...props} />
}
