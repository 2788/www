/**
 * @file 带 icon 的操作入口
 * @description 一般用于 PC 端，固定在页面右下角
 */

import React, { ReactNode } from 'react'

import Link from 'components/Link'

import { useHoverHandlers } from 'hooks/hover'

import style from './style.less'

export type Props = {
  icon: ReactNode
  href?: string
  onClick?: () => void
  onHover?: (hovered: boolean) => void
}

export default function IconEntry({
  icon,
  href,
  onClick,
  onHover
}: Props) {
  const hoverHandlers = useHoverHandlers(onHover)

  if (href != null) {
    return (
      <Link
        className={style.wrapper}
        href={href}
        onClick={onClick}
        {...hoverHandlers}
      >
        {icon}
      </Link>
    )
  }

  return (
    <div
      className={style.wrapper}
      onClick={onClick}
      {...hoverHandlers}
    >
      {icon}
    </div>
  )
}
