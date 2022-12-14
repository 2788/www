/**
 * @file 多行描述
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { ReactNode } from 'react'
import classNames from 'classnames'

import styles from './style.less'

export interface Props {
  className?: string
  title?: string
  children: ReactNode
}

export default function Description({ className, title, children }: Props) {
  return (
    <p className={classNames(styles.desc, className)} title={title}>
      {children}
    </p>
  )
}
