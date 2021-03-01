import React, { useContext } from 'react'
import classnames from 'classnames'
import useDelay from 'hooks/use-delay'

import { context } from '../..'
import style from './index.less'

export type MenuItemProps = {
  title: string
  subtitle: string
}

export default function MenuItem({ title, subtitle }: MenuItemProps) {
  const ctxValue = useContext(context)
  if (!ctxValue) {
    throw new Error('Component Menu Item should be used in Overlay.')
  }
  const { activeMenu, setActiveMenu } = ctxValue
  const delayObj = useDelay(50)

  function handleMouseEnter() {
    delayObj.start(() => {
      // eslint-disable-next-line no-unused-expressions
      setActiveMenu?.(title)
    })
  }

  return (
    <li
      className={classnames(style.wrapper, activeMenu === title && style.active)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => delayObj.stop()}
    >
      <div className={style.title}>{title}</div>
      <div className={style.subtitle}>{subtitle}</div>
    </li>
  )
}
