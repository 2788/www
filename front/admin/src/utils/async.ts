/**
 * @file 异步工具
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { useRef, useState, useCallback, ReactNode } from 'react'
import { makeCancelled } from 'qn-fe-core/exception'

// https://github.com/then/is-promise/blob/master/index.js
export function isPromise<T = unknown>(obj: any): obj is Promise<T> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

export function getPromise<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((resolveFn, rejectFn) => {
    resolve = resolveFn
    reject = rejectFn
  })
  return { resolve, reject, promise }
}

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

function useModalLikeBase<T = undefined>() {
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

export function useModalLike<T = undefined>() {
  const delay = 300 // 单位 ms，参考 ant.design

  const { visible, resolve, reject: baseReject, open } = useModalLikeBase<T>()

  const [isClosing, setIsClosing] = useState(false)

  const reject = useCallback((...args: Parameters<typeof baseReject>): ReturnType<typeof baseReject> => {
    setIsClosing(true)
    setTimeout(() => { setIsClosing(false) }, delay) // 常见场景下在一个 delay 内无法再次 open modal
    return baseReject(...args)
  }, [baseReject])

  /** 关闭弹窗后卸载组件主体 */
  function render(modal: ReactNode): ReactNode {
    return !visible && !isClosing ? null : modal
  }

  return { visible, resolve, reject, open, render }
}
