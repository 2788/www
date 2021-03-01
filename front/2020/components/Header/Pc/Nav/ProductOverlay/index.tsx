/**
 * @file          component  ProductOverlay
 * @description   产品导航栏目录 overlay，ScrollableOverlay 的简化版，不可滚动切换目录
 * @author        renpanpan
 */

import React, { PropsWithChildren, createContext, useState } from 'react'

import style from './index.less'

export type ContextValue = {
  activeMenu: string | undefined
  setActiveMenu(menu: string): void
}

export const context = createContext<ContextValue | null>(null)

export default function ProductOverlay({ children }: PropsWithChildren<{}>) {
  const [activeMenu, setActiveMenu] = useState<string>()

  return (
    <context.Provider
      value={{
        activeMenu,
        setActiveMenu
      }}
    >
      <div className={style.overlay}>{children}</div>
    </context.Provider>
  )
}
