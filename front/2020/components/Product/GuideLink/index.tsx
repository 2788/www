/**
 * @file 引导链接（白底蓝字居中，带箭头），用于引导用户体验、注册等
 * @description 目前在 Pandora & QVS 的接入流程组件下方使用到，后续可以考虑内置到接入流程组件（AccessProcess）
 */

import cls from 'classnames'
import React, { PropsWithChildren, CSSProperties } from 'react'
import Link from 'components/Link'

import IconArrow from './arrow.svg'
import style from './style.less'

export type Props = PropsWithChildren<{
  href: string
  className?: string
  style?: CSSProperties
}>

export default function GuideLink({ href, className, style: wrapperStyle, children }: Props) {
  const wrapperClassName = cls(style.wrapper, className)
  return (
    <p className={wrapperClassName} style={wrapperStyle}>
      <Link href={href}>
        <span>{children}</span>
        <IconArrow />
      </Link>
    </p>
  )
}
