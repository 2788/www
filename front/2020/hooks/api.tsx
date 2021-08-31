/**
 * @file 接口调用相关辅助 hooks
 */

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { debounce } from 'lodash'

import { getNormalizedErrorMessage } from 'utils/fetch'
import { useSuccessDialog, useErrorDialog } from 'components/UI/Dialog'

export type ApiMethod = (...args: any) => Promise<any>
export type CallFor<F extends ApiMethod> = (...args: Parameters<F>) => void
export type ResultFor<F extends ApiMethod, RT = ReturnType<F>> = RT extends Promise<infer R> ? R : never

export type UseApiOptions = {
  /** 延时，为 `call`（接口调用）添加 debounce 效果 */
  delay?: number
}

// 标识当前组件是否存活（未被销毁）的信息
export function useAlive() {
  const aliveRef = useRef(true)

  useEffect(() => () => {
    aliveRef.current = false
  }, [])

  return aliveRef
}

export function useApi<F extends ApiMethod>(
  /** API 实现函数，预期参数为 API 调用参数，返回值为包裹 API 请求结果的 Promise */
  apiMethod: F,
  /** 其他配置项，如防抖等 */
  _options?: UseApiOptions
) {
  const options = {
    delay: 0,
    ..._options
  }

  const [result, setResult] = useState<ResultFor<F> | null>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  const alive = useAlive()

  // eslint-disable-next-line no-underscore-dangle
  let _call: CallFor<F> = (...args: any[]) => {
    setLoading(true)
    setCompleted(false)
    apiMethod(...args).then(
      res => {
        if (!alive.current) return
        setResult(res)
        setError(null)
        setLoading(false)
        setCompleted(true)
      },
      e => {
        if (!alive.current) return
        // eslint-disable-next-line no-console
        console.warn('[API_ERROR]', e)
        setResult(null)
        setError(e)
        setLoading(false)
        setCompleted(true)
      }
    )
  }

  if (options.delay > 0) {
    const debounced = debounce(_call, options.delay)
    _call = (...args: Parameters<F>) => {
      // 如果被 debounce 处理过，一旦 `call` 被调用，即
      // 执行到这里就应该设置 `loading: true`
      setLoading(true)
      setCompleted(false)
      debounced(...args)
    }
  }

  const call = useCallback(_call, [apiMethod, options.delay])

  return {
    $: result,
    error,
    loading,
    completed,
    call
  }
}

export type UseApiWithParamsOptions<F extends ApiMethod> = UseApiOptions & {
  /** 请求参数，为 null / undefined 则不请求 */
  params?: Parameters<F> | null
}

/**
 * 通过给定的参数使用 API，即，参数发生变更自动调用之
 */
export function useApiWithParams<F extends ApiMethod>(
  /** API 实现函数，预期参数为 API 调用参数，返回值为包裹 API 请求结果的 Promise */
  apiMethod: F,
  /** 其他配置项，如参数、防抖等 */
  { params, ...options }: UseApiWithParamsOptions<F>
) {
  const { call: callWithParams, ...others } = useApi(apiMethod, options)

  const call = useCallback(
    () => {
      if (params) callWithParams(...params)
    },
    [callWithParams].concat(params || []) // eslint-disable-line react-hooks/exhaustive-deps
  )

  // 参数变更 -> call 变更 -> 重新执行 call
  useEffect(call, [call])

  return { ...others, call }
}

interface PromiseHandlers<T> {
  promise: Promise<T>
  resolve: (value: T) => void
  reject: (error: unknown) => void
}

function getPromiseHandlers<T>(): PromiseHandlers<T> {
  let resolve!: (value: T) => void
  let reject!: (error: unknown) => void
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve
    reject = promiseReject
  })
  return { resolve, reject, promise }
}

export function useApiWithDialogToaster<F extends ApiMethod>(
  /** API 实现函数，预期参数为 API 调用参数，返回值为包裹 API 请求结果的 Promise */
  apiMethod: F,
  successText?: string,
  errorText?: string
) {
  const base = useApi(apiMethod)
  const [showSuccessDialog, SuccessDialog] = useSuccessDialog()
  const [showErrorDialog, ErrorDialog] = useErrorDialog()

  const promiseHandlersRef = useRef<PromiseHandlers<ResultFor<F>> | null>(null)

  useEffect(() => {
    // before first api call
    if (!base.loading && !base.completed) {
      return
    }

    // first completed of each group of api calls
    if (base.completed && promiseHandlersRef.current != null) {
      const { resolve, reject } = promiseHandlersRef.current!
      if (base.error == null) {
        const done = () => {
          resolve(base.$ as ResultFor<F>) // not null
          promiseHandlersRef.current = null
        }

        if (!successText) {
          done()
          return
        }

        showSuccessDialog({ children: successText }).then(() => {
          done()
        })
      } else {
        showErrorDialog({ children: getNormalizedErrorMessage(base.error, errorText) }).then(() => {
          reject(base.error)
          promiseHandlersRef.current = null
        })
      }
    }
  }, [base.loading, base.completed, base.$, base.error, successText, errorText, showSuccessDialog, showErrorDialog])

  const baseCall = base.call // eslint check hooks deps bug
  const call = useCallback((...args: Parameters<F>): ReturnType<F> => {
    // the beginning of each group of api calls
    if (promiseHandlersRef.current == null) {
      promiseHandlersRef.current = getPromiseHandlers<ResultFor<F>>() // init status for future completed
      baseCall(...args)
    } else {
      // 注意：这里跟 `useApi` 的行为有所不同：
      // `useApi` 虽然有 debounce（解决短时间内多次 re render 导致的多次 use effect -> api call 的问题）
      // 但实质上是不管竞态的，运行结果比较随机但一般不会报错问题不大；
      // 而这里由于要缓存 promise，直接不管是有可能导致 js 报错页面崩溃的，为了实现简单一点，这里采取的策略是：
      // 上锁，在前面的 fetch 结束前后续 fetch 会一直复用前面这个还没结束的 fetch 产生的 promise；
      // 而不是产生一个新的替换掉正在 fetch 的这个，然后把正在 fetch 的这个给 abort / discard 掉。
      // 一般来说，`useApiWithDialogToaster` 的使用场景本身就会用 `loading` 上锁，
      // 跟 `portal` 的常见情况是一致的，因此实际上也不容易出问题
      // eslint-disable-next-line no-console
      console.error('[USE_API_ERROR]', 'Last request was discarded, use pending one instead.')
    }

    return promiseHandlersRef.current.promise as ReturnType<F>
  }, [baseCall])

  const Dialog = useCallback(function ControlledDialog() {
    // FIXME: eslint 依赖检测有 bug
    const CompSuccessDialog = SuccessDialog
    const CompErrorDialog = ErrorDialog
    return (
      <>
        <CompSuccessDialog title="成功提示" />
        <CompErrorDialog title="失败提示" />
      </>
    )
  }, [SuccessDialog, ErrorDialog])

  return {
    ...base,
    call,
    Dialog // TODO: 需要优化，好麻烦，应该找个全局的地方先挂好
  }
}
