/**
 * @file          component  Content
 * @description   纯显示 Content 组件，一个 menuItem 对应一个 Content，通过 activeMenu 来控制具体显示哪个 Content
 * @author        renpanpan
 */

import React, { useContext, PropsWithChildren } from 'react'

import { context } from '..'
import style from './index.less'

export default function Content({ children, name }: PropsWithChildren<{ name: string }>) {
  const ctxValue = useContext(context)
  if (!ctxValue) {
    throw new Error('Component Content should be used in Overlay.')
  }

  return (
    <ul className={style.content} style={{ display: ctxValue.activeMenu === name ? undefined : 'none' }}>{children}</ul>
  )
}
