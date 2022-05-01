/**
 * @file 带标题 & icon 的操作入口 V2
 * @description 一般用于 PC 端，固定在页面右下角
 */

import React, { PropsWithChildren, ReactNode } from 'react'

import Link from 'components/Link'

import { useHoverHandlers } from 'hooks/hover'

import style from './style.less'

export type Props = PropsWithChildren<{
  icon: ReactNode
  href?: string
  onClick?: () => void
  onHover?: (hovered: boolean) => void
}>

export default function IconTextEntry({
  icon,
  href,
  onClick,
  onHover,
  children
}: Props) {
  const hoverHandlers = useHoverHandlers(onHover)
  const content = (
    <>
      {icon}

      <span className={style.text}>
        {children}
      </span>
    </>
  )

  if (href != null) {
    return (
      <Link
        className={style.wrapper}
        href={href}
        onClick={onClick}
        {...hoverHandlers}
      >
        {content}
      </Link>
    )
  }

  return (
    <div
      className={style.wrapper}
      onClick={onClick}
      {...hoverHandlers}
    >
      {content}
    </div>
  )
}
