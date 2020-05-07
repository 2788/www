/**
 * @file 与 URL 相关的 hooks
 */

import { useState, useEffect, useCallback } from 'react'
import { isBrowser } from '../utils'

export type HashValue = string | null

/** 获取 URL hash 内容（去 `#` 号后），若无 hash 内容则返回 `null` */
export function useHash() {
  const [hash, setHash] = useState<HashValue>(getHash())

  useEffect(() => {
    if (!isBrowser()) { return }

    const handleHashChange = () => setHash(getHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const updateHash = useCallback((newHash: HashValue) => {
    if (!isBrowser()) { return }

    if (newHash && newHash[0] !== '#') {
      // 补一个 `#`
      newHash = '#' + newHash
    }
    if (!newHash) {
      newHash = ''
    }
    window.location.hash = newHash
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
