import { useCallback, useLayoutEffect, useRef } from 'react'

/**
 * (!) Approximate behavior
 * @ref https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md#internal-implementation
 */
export default function useEvent<T extends(...args: any[]) => any>(handler: T): T {
  const handlerRef = useRef<T | null>(null)

  // In a real implementation, this would run before layout effects
  useLayoutEffect(() => {
    handlerRef.current = handler
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback<T>(
    ((...args: any[]) => {
      // In a real implementation, this would throw if called during render
      const fn = handlerRef.current!
      return fn(...args)
    }) as T,
    []
  )
}
