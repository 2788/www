/**
 * @file 与 URL 相关的 hooks
 */

import { useState, useCallback, useEffect } from 'react'
import { ParsedUrlQuery, parse } from 'querystring'
import { useRouter } from 'next/router'
import { isBrowser } from '../utils'

export type HashValue = string | null

/** 获取 URL hash 内容（去 `#` 号后），若无 hash 内容则返回 `null` */
export function useHash() {
  const [hash, setHash] = useState<HashValue>('')

  useEffect(() => {
    if (!isBrowser()) { return }

    const syncHash = () => setHash(getHash())
    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  const updateHash = useCallback((newHash: HashValue) => {
    if (!isBrowser()) return

    const { history, document, location } = window
    const currentHash = getHash()

    // 新 hash 与当前 hash 等价，则不处理
    if (newHash === currentHash) return
    if (!newHash && !currentHash) return

    if (!newHash) {
      // 注意这里如果直接通过 `location.hash = ''` 来设置，页面会自动滚到顶部（浏览器行为）
      // 通过 `history.replaceState` 来避免这个问题，也可以干掉 URL 最后的那个 `#`
      history.replaceState(
        history.state,
        document.title,
        location.pathname + location.search
      )
      // 此时不会触发 `hashchange` 事件，需要手动设置下
      setHash(null)
      return
    }

    // 如果不以 `#` 开头，就补一个 `#`（好像不补也没关系？）
    location.hash = (newHash[0] !== '#' ? '#' : '') + newHash
  }, [])

  return [hash, updateHash] as const
}

function getHash(): HashValue {
  if (!isBrowser()) {
    return null
  }
  const hash = window.location.hash.slice(1)
  return hash || null
}

function hasOwnProp(target: any, key: string) {
  return Object.prototype.hasOwnProperty.call(target, key)
}

/**
 * 获取 query 内容（解析后）
 * next/router 提供的 `useRouter` 不靠谱，
 * 有时候走进来明明路径（`router.asPath`）上有正确的 search 内容，
 * 但 `router.query` 还是个空 `{}`，只好自己搞一个。
 * 另外把初始值设置为空 `{}`，以保持客户端初始渲染跟服务端渲染逻辑的一致
 * 实现得比较粗糙，就不导出了
 */
function useQuery() {
  const router = useRouter()
  const querystring = router.asPath.split('?')[1] || ''
  const [query, setQuery] = useState<ParsedUrlQuery>({})

  useEffect(() => {
    setQuery(parse(querystring))
  }, [querystring])

  const setQueryByRouter = useCallback((newQuery: ParsedUrlQuery) => {
    router.replace({
      pathname: router.pathname,
      query: newQuery
    })
  }, [router])

  return [query, setQueryByRouter] as const
}

/** 获取指定 URL query 参数的值 */
export function useQueryValue<T extends string>(key: string, defaultValue: T) {

  const [query, setQuery] = useQuery()
  const rawQueryValue = hasOwnProp(query, key) ? query[key] : undefined
  const queryValue = Array.isArray(rawQueryValue) ? rawQueryValue.join(',') : rawQueryValue
  const value = queryValue != null ? queryValue : defaultValue

  const setValue = useCallback((newValue?: string) => {
    function noSense(v: string | string[] | undefined) {
      // 值跟 `defaultValue` 相等的话，也当成没有值来处理
      return v == null || v === defaultValue
    }

    if (query[key] === newValue) return
    if (noSense(query[key]) && noSense(newValue)) return

    if (noSense(newValue)) {
      const { [key]: _, ...others } = query
      setQuery(others)
      return
    }
    setQuery({ ...query, [key]: newValue! })
  }, [query, setQuery, key, defaultValue])

  return [value, setValue] as const
}
