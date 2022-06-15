/**
 * @file use unstable event
 * @author lizhifeng <lizhifeng@qiniu.com>
 * @doc 参考 https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md#internal-implementation
 */

import { useRef, useCallback } from 'react'

import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect'

/** (!) Approximate behavior */
export default function useUnstableEvent<T extends((...args: any[]) => any)>(handler: T): T {
  const handlerRef = useRef<T | null>(null)

  // In a real implementation, this would run before layout effects
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler
  })

  return useCallback(
    ((...args: any[]) => {
      // In a real implementation, this would throw if called during render
      const fn = handlerRef.current!
      return fn(...args)
    }) as T,
    []
  )
}
