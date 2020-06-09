import React, { useContext } from 'react'
import classnames from 'classnames'
import useDelay from 'hooks/use-delay'
import { useSmoothElementScrollTo } from 'hooks/scroll'

import style from './index.less'
import { Context } from '../..'

export type MenuItemProps = {
  title: string
  subtitle: string
}

export default function MenuItem({ title, subtitle }: MenuItemProps) {
  const { activeMenu, setActiveMenu, scrollTopMap, scrollContainerRef } = useContext(Context)
  const scrollTo = useSmoothElementScrollTo(scrollContainerRef)
  const delayObj = useDelay(50)

  function handleMouseEnter() {
    delayObj.start(() => {
      // eslint-disable-next-line no-unused-expressions
      setActiveMenu?.(title)
      scrollTo(scrollTopMap[title])
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
