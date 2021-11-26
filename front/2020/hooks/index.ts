import { useCallback, useEffect, useRef, useState } from 'react'

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

/** 计数器 */
export function useCount(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increase = useCallback(() => {
    setCount(v => v + 1)
  }, [])
  const decrease = useCallback(() => {
    setCount(v => v - 1)
  }, [])
  return [count, increase, decrease] as const
}

/** 定时器 */
export function useInterval(callback: () => void, delay: number) {
  const ref = useRef<() => void>()
  ref.current = callback

  const timerRef = useRef<number>()
  const [shouldStart, setShouldStart] = useState(false)

  const clear = useCallback(() => {
    clearInterval(timerRef.current)
  }, [])
  const stop = useCallback(() => {
    setShouldStart(false)
    clear()
  }, [clear])
  const start = useCallback(() => {
    clear()
    setShouldStart(true)
  }, [clear])

  useEffect(() => {
    if (shouldStart) {
      const timer = setInterval(() => ref.current && ref.current(), delay)
      timerRef.current = timer as any as number
    }
    return clear
  }, [delay, shouldStart, clear])

  return { start, stop }
}
