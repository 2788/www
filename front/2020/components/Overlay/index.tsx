import React, { createContext, PropsWithChildren, ReactNode, useCallback, useContext, useState } from 'react'

import style from './index.less'

export type OverlayContext = {
  entry: ReactNode
  add(entry: ReactNode, options?: { bgColor?: string }): () => void
  remove(): void
}

export const OverlayContext = createContext<OverlayContext | null>(null)

export function OverlayProvider({ children }: PropsWithChildren<{}>) {
  const [entry, setEntry] = useState<ReactNode>(null)
  const removeEntry = useCallback(() => {
    setEntry(null)
  }, [])
  const addEntry = useCallback((_entry: ReactNode) => {
    setEntry(previous => {
      if (previous) {
        throw Error('暂不支持多层 Overlay')
      }

      return _entry
    })
    return removeEntry
  }, [removeEntry])

  return (
    <OverlayContext.Provider value={{ entry, add: addEntry, remove: removeEntry }}>{children}</OverlayContext.Provider>
  )
}

export function OverlaySlot() {
  return (
    <OverlayContext.Consumer>
      {
        context => {
          if (context === null) {
            return null
          }

          if (context.entry == null) {
            return null
          }

          return (
            <div className={style.wrapper}>
              <div className={style.mask} onClick={() => context.remove()}></div>
              <div className={style.modal}>{context.entry}</div>
            </div>
          )
        }
      }
    </OverlayContext.Consumer>
  )
}

export function useOverlay() {
  const context = useContext(OverlayContext)

  if (context === null) {
    throw Error('Make sure OverlayProvider is your ancestor component.')
  }

  return { add: context.add, remove: context.remove }
}
