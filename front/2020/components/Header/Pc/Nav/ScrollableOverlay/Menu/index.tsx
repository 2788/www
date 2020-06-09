import React, { ReactElement, useEffect, useContext } from 'react'

import style from './index.less'
import { Context } from '..'

type MenuProps = { children: ReactElement[], defaultActive: string }

export default function Menu({ children, defaultActive }: MenuProps) {
  const { setActiveMenu } = useContext(Context)

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    setActiveMenu?.(defaultActive)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActiveMenu])

  return (
    <ul className={style.menu}>
      {children}
    </ul>
  )
}
