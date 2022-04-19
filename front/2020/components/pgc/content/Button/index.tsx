/**
 * @file 内容详情页常用按钮
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { ReactNode } from 'react'
import classNames from 'classnames'

import BaseButton from 'components/UI/Button'

import style from './style.less'

export interface Props {
  children: ReactNode
  onClick?(): void
  htmlType?: 'submit'
  disabled?: boolean
  className?: string
}

export default function Button({ children, onClick, htmlType, disabled, className }: Props) {
  return (
    <BaseButton
      type="primary"
      onClick={() => onClick?.()}
      htmlType={htmlType}
      disabled={disabled}
      className={classNames(style.btn, className)}
    >
      {children}
    </BaseButton>
  )
}
