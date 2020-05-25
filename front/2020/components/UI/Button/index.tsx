/**
 * @file 各种按钮
 * @description 各种按钮
 */

// TODO: 交互状态，如 hover、active 等，跟 @设计师同学 确认下

import React, { HTMLAttributes, ButtonHTMLAttributes, MouseEvent } from 'react'
import Link from 'components/Link'
import style from './style.less'

export type Props = HTMLAttributes<HTMLElement> & {
  /** 按钮类型：白底蓝字 / 蓝底白字 / 透明底蓝字 / 透明底白字 */
  type?: 'default' | 'primary' | 'hollow' | 'primary-hollow'
  /** 按钮尺寸 */
  size?: 'default' | 'small'
  /** 是否有边框 */
  withBorder?: boolean
  /** 链接地址，如传该字段，按钮会被渲染为 <a> 标签 */
  href?: string
  target?: string
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
}

const typeStyleMap = {
  default: null,
  primary: style.typePrimary,
  hollow: style.typeHollow,
  'primary-hollow': style.typePrimaryHollow
}

const sizeStyleMap = {
  default: null,
  small: style.sizeSmall
}

function disabledClickHandler(e: MouseEvent) {
  e.preventDefault()
}

export default function Button({
  type, size, withBorder, className,
  htmlType, href, disabled, onClick, ...otherProps
}: Props) {

  type = type == null ? 'default' : type
  size = size == null ? 'default' : size

  onClick = disabled ? disabledClickHandler : onClick

  className = [
    className,
    style.button,
    typeStyleMap[type],
    sizeStyleMap[size],
    withBorder && style.withBorder,
    disabled && style.disabled
  ].filter(Boolean).join(' ')

  // <button>
  if (href == null) {
    return (
      <button
        {...otherProps}
        className={className}
        // eslint-disable-next-line react/button-has-type
        type={htmlType}
        disabled={disabled}
        onClick={onClick}
      />
    )
  }

  // else <a>
  return (
    <Link
      href={href}
      {...otherProps}
      className={className}
      onClick={onClick}
    />
  )
}
