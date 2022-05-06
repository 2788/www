/**
 * @file 各种按钮
 * @description 各种按钮
 */

import React, { HTMLAttributes, ButtonHTMLAttributes, MouseEvent } from 'react'
import Link from 'components/Link'
import style from './style.less'

export type Props = HTMLAttributes<HTMLElement> & {
  /** 按钮类型：白底蓝字 / 蓝底白字 / 浅蓝底白字 / 透明底蓝字 / 透明底白字 / 白底黑字 */
  type?: 'default' | 'primary' | 'primary-light' | 'hollow' | 'primary-hollow' | 'default-grey'
  /** 按钮尺寸 */
  size?: 'default' | 'small' | 'large'
  /** 是否有边框 */
  withBorder?: boolean
  /** 链接地址，如传该字段，按钮会被渲染为 <a> 标签 */
  href?: string
  target?: string
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  disabled?: boolean
  download?: any
}

const typeStyleMap = {
  default: null,
  primary: style.typePrimary,
  'primary-light': style.typePrimaryLight,
  hollow: style.typeHollow,
  'primary-hollow': style.typePrimaryHollow,
  'default-grey': style.typeDefaultGrey
}

const sizeStyleMap = {
  default: null,
  small: style.sizeSmall,
  large: style.sizeLarge
}

function disabledClickHandler(e: MouseEvent) {
  e.preventDefault()
}

export default function Button({
  type, size, withBorder, className, download,
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
      download={download}
      {...otherProps}
      className={className}
      onClick={onClick}
    />
  )
}
