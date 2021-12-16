import React, { ReactElement, useEffect, useContext } from 'react'

import style from './style.less'
import { context } from '..'

type MenuProps = { children: ReactElement[], defaultActive: string }

export default function Menu({ children, defaultActive }: MenuProps) {
  const ctxValue = useContext(context)
  if (!ctxValue) {
    throw new Error('Component Menu should be used in Overlay.')
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    ctxValue.setActiveMenu?.(defaultActive)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctxValue.setActiveMenu])

  return (
    <ul className={style.menu}>
      {children}
    </ul>
  )
}
