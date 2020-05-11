import { useEffect, useRef } from 'react'

/**
 * 类似 useEffect，区别是不会自动触发第一次执行，仅后续 deps 发生变更时才会执行
 * 相当于不带 `fireImmediately: true` 的 `reaction()`
 */
export function useOnChange(handler: () => void, deps: any[]) {
  const firstRef = useRef(true)
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false
      return
    }
    handler()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
