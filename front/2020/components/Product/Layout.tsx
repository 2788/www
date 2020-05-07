/**
 * @file 产品页用的 Layout
 * @description 在基础的 Layout 基础上多一些产品页特有的逻辑，如 Navigatable
 */

import React from 'react'
import BaseLayout, { Props as BaseLayoutProps } from '../Layout'
import { Navigatable } from './Navigator'

export type Props = BaseLayoutProps

export default function Layout({ children, ...otherProps }: Props) {
  return (
    <BaseLayout {...otherProps}>
      <Navigatable>
        {children}
      </Navigatable>
    </BaseLayout>
  )
}
