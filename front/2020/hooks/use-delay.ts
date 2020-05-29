/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Fri May 29 2020
 * @file: 延迟执行回调函数，可以取消
 *
 * Copyright (c) 2020 Qiniu
 */

import { useRef, useEffect, useCallback } from 'react'

export default function useDelay(delay: number) {
  const timeoutRef = useRef<number>()

  const stop = useCallback(() => {
    clearInterval(timeoutRef.current)
  }, [])

  const startEffect = useCallback((callback: () => void) => {
    timeoutRef.current = setTimeout(() => {
      callback()
      stop()
    }, delay) as any as number
  }, [delay, stop])

  const start = useCallback((callback: () => void) => {
    stop()
    startEffect(callback)
  }, [startEffect, stop])

  useEffect(() => stop)

  return { start, stop }
}
