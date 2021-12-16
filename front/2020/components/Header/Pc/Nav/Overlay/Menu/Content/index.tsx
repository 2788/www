/**
 * @file          component  Content
 * @description   Menu Content 组件，Content 组件在 Menu 的实现版
 * @author        renpanpan
 */

import React, { useContext } from 'react'
import cls from 'classnames'

import { context } from '../..'
import CommonContent, { Props } from '../../Content'
import style from './style.less'

export default function Content({ className, name, ...rest }: Props & { name: string }) {
  const ctxValue = useContext(context)
  if (!ctxValue) {
    throw new Error('Component Content should be used in Overlay.')
  }
  return (
    <CommonContent
      className={cls(style.content, name !== ctxValue.activeMenu && style.hidden, className)}
      {...rest}
    />
  )
}
