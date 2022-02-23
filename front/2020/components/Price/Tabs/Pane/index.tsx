import React, { PropsWithChildren, useContext } from 'react'
import classnames from 'classnames'
import { TabsContext, Active } from '..'

import style from './index.less'

export function Pane({ children, className, name }: PropsWithChildren<{ name: Active, className?: string }>) {
  const context = useContext(TabsContext)
  const isActive = context?.active === name

  return (
    <div className={classnames(style.pane)} style={{ display: isActive ? 'block' : 'none' }}>
      <div className={classnames(style.content, className)}>{children}</div>
    </div>
  )
}
