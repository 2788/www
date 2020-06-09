import React, { PropsWithChildren, createContext, useRef, useCallback, useState, RefObject } from 'react'

import style from './index.less'

export type Context = {
  activeMenu: string | undefined
  setActiveMenu(menu: string): void
  scrollTopMap: { [key in string]: number }
  registerScrollTop(name: string, value: number): void
  scrollContainerRef: RefObject<HTMLElement | undefined>
  registerScrollContainer(container: HTMLElement): void
}

export const Context = createContext<Context>({} as Context)

export default function ScrollableOverlay({ children }: PropsWithChildren<{}>) {
  const scrollTopMapRef = useRef<{ [key in string]: number }>({})
  const scrollContainerRef = useRef<HTMLElement>()
  const [activeMenu, setActiveMenu] = useState<string>()

  const registerScrollTop = useCallback((name: string, value: number) => {
    scrollTopMapRef.current[name] = value
  }, [])

  const registerScrollContainer = useCallback((container: HTMLElement) => {
    scrollContainerRef.current = container
  }, [])

  return (
    <Context.Provider
      value={{
        activeMenu,
        setActiveMenu,
        scrollTopMap: scrollTopMapRef.current,
        registerScrollTop,
        scrollContainerRef,
        registerScrollContainer
      }}
    >
      <div className={style.overlay}>{children}</div>
    </Context.Provider>
  )
}
