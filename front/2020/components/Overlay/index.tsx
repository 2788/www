import React, { createContext, PropsWithChildren, ReactElement, useCallback, useContext, useState, useMemo } from 'react'
import { useGlobalModal } from 'hooks/scroll'
import style from './index.less'

export type OverlayContext = {
  entries: ReactElement[]
  add(entry: ReactElement, options?: { bgColor?: string }): () => void
  remove(entry?: ReactElement): void
}

export const OverlayContext = createContext<OverlayContext | null>(null)

export function OverlayProvider({ children }: PropsWithChildren<{}>) {
  const [entries, setEntries] = useState<ReactElement[]>([])

  const removeEntry = useCallback((entry?: ReactElement) => {
    setEntries(list => (
      entry
      ? list.filter(item => item !== entry)
      : list.slice(0, -1)
    ))
  }, [])

  const addEntry = useCallback((entry: ReactElement) => {
    setEntries(list => [...list, entry])
    return () => { removeEntry(entry) }
  }, [removeEntry])

  const value = useMemo(() => ({
    entries,
    add: addEntry,
    remove: removeEntry
  }), [entries, addEntry, removeEntry])

  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  )
}

export function OverlaySlot() {
  const context = useContext(OverlayContext)
  const hasEntry = context != null && context.entries.length > 0

  useGlobalModal(hasEntry)

  if (!hasEntry) {
    return null
  }

  return (
    <div className={style.wrapper}>
      <div className={style.mask} onClick={() => { context!.remove() }}></div>
      {/* TODO: 优化成能显示多层 entry */}
      <div className={style.modal}>{context!.entries.slice(-1)[0]}</div>
    </div>
  )
}

export function useOverlay() {
  const context = useContext(OverlayContext)

  if (context === null) {
    throw Error('Make sure OverlayProvider is your ancestor component.')
  }

  return { add: context.add, remove: context.remove }
}
