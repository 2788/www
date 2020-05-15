import React, { PropsWithChildren, useContext } from 'react'
import { BannerContext, Active } from '..'

import style from './index.less'

export function Pane({ children, name }: PropsWithChildren<{ name: Active }>) {
  const context = useContext(BannerContext)
  const isActive = context?.active === name

  return (
    <div className={style.pane} style={{ display: isActive ? 'block' : 'none' }}>
      <div className={style.content}>{children}</div>
    </div>
  )
}
