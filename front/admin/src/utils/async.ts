/**
 * @file 异步工具
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { useRef, useState, useCallback } from 'react'
import { makeCancelled } from 'qn-fe-core/exception'

export function usePromise<T>() {
  const resolveRef = useRef<(value: T | PromiseLike<T>) => void>(() => undefined)
  const rejectRef = useRef<(reason?: unknown) => void>(() => undefined)
  const isPendingRef = useRef(false)

  const start = useCallback(
    () => new Promise<T>((resolve, reject) => {
      if (isPendingRef.current) {
        // eslint-disable-next-line no-console
        console.warn('Promise deprecated.')
      }
      isPendingRef.current = true

      resolveRef.current = resolve
      rejectRef.current = reject
    }).finally(() => { isPendingRef.current = false }),
    []
  )

  return {
    resolve: resolveRef.current,
    reject: rejectRef.current,
    start
  }
}

export function useModalLike<T = undefined>() {
  const [visible, setVisible] = useState(false)
  const { resolve, reject, start } = usePromise<any>()
  return {
    visible,
    resolve: useCallback((...args: T extends undefined ? [] : [T]): void => {
      setVisible(false)
      resolve(args[0])
    }, [resolve]),
    reject: useCallback((reason: unknown = makeCancelled('Modal cancelled.')): void => {
      setVisible(false)
      reject(reason)
    }, [reject]),
    open: useCallback((): Promise<T extends undefined ? void : T> => {
      setVisible(true)
      return start()
    }, [start])
  }
}
