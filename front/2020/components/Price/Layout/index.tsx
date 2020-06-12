/**
 * @file 价格页用的 Layout
 */

import React from 'react'
import BaseLayout, { Props as BaseLayoutProps } from '../../Layout'

import style from './index.less'

export type Props = BaseLayoutProps

export default function Layout({ children, ...otherProps }: Props) {
  return (
    <BaseLayout {...otherProps}>
      <div className={style.font}>{children}</div>
    </BaseLayout>
  )
}
