/**
 * @file          component  Overlay
 * @description   通用的导航栏目录 overlay，不可滚动切换目录
 * @author        renpanpan
 */

import React, { PropsWithChildren, createContext, useState } from 'react'
import cls from 'classnames'

import style from './style.less'

export type ContextValue = {
  activeMenu: string | undefined
  setActiveMenu(menu: string): void
}

export const context = createContext<ContextValue | null>(null)

type Props = PropsWithChildren<{
  className?: string
}>

export default function Overlay({ children, className }: Props) {
  return (
    <div className={cls(style.overlay, className)}>
      {children}
    </div>
  )
}

/** 里面内容有 menu 的 overlay */
export function OverlayWithMenu({ children, className }: Props) {
  const [activeMenu, setActiveMenu] = useState<string>()

  return (
    <context.Provider
      value={{
        activeMenu,
        setActiveMenu
      }}
    >
      <Overlay className={cls(style.overlayWithMenu, className)}>
        <div className={style.left}></div>
        <div className={style.content}>
          {children}
        </div>
        <div className={style.right}></div>
      </Overlay>
    </context.Provider>
  )
}
