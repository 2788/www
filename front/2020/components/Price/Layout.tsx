/**
 * @file 价格页用的 Layout
 */

import React from 'react'
import { UaContext } from 'hooks/ua'
import BaseLayout, { Props as BaseLayoutProps } from '../Layout'

export type Props = BaseLayoutProps

export default function Layout({ children, ...otherProps }: Props) {
  // 移动端没做适配，为了保持可用即页面不变形，显示 pc 内容
  return (
    <UaContext.Provider value={{ isMobile: false }}>
      <BaseLayout {...otherProps}>
        {children}
      </BaseLayout>
    </UaContext.Provider>
  )
}
