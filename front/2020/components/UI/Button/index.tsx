/**
 * @file 各种按钮
 * @description 各种按钮
 */

// TODO: 交互状态，如 hover、active 等，跟 @设计师同学 确认下

import React, { HTMLAttributes, ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import style from './style.less'

export type Props = HTMLAttributes<HTMLElement> & {
  /** 按钮类型：白底蓝字 / 蓝底白字 / 透明底白字 */
  type?: 'default' | 'primary' | 'hollow'
  /** 按钮尺寸 */
  size?: 'default' | 'small'
  /** 是否有边框 */
  withBorder?: boolean
  /** 链接地址，如传该字段，按钮会被渲染为 <a> 标签 */
  href?: string
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

const typeStyleMap = {
  default: null,
  primary: style.typePrimary,
  hollow: style.typeHollow
}

const sizeStyleMap = {
  default: null,
  small: style.sizeSmall
}

export default function Button({
  type, size, withBorder, className,
  htmlType, href, ...otherProps
}: Props) {

  type = type == null ? 'default' : type
  size = size == null ? 'default' : size

  className = [
    className,
    style.button,
    typeStyleMap[type],
    sizeStyleMap[size],
    withBorder && style.withBorder
  ].filter(Boolean).join(' ')

  // <button>
  if (href == null) {
    return (
      // eslint-disable-next-line react/button-has-type
      <button
        {...otherProps}
        className={className}
        type={htmlType}
      />
    )
  }

  // 简单判断下是否是外部链接
  if (href.indexOf('http') > -1) {
    return <a href={href} target="_blank" rel="noopener" {...otherProps} className={className} />
  }

  // else <a>
  return (
    <Link href={href}>
      <a {...otherProps} className={className} />
    </Link>
  )
}
