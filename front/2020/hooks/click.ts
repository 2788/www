/**
 * @file 点击相关 hooks
 */

import { useRef, useEffect } from 'react'
import { contains } from 'utils/dom'

/** 注册目标 dom 节点之外的点击事件，触发 callback */
export function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (ref.current && contains(ref.current, e.target as Node)) {
        return
      }
      callback()
    }
    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [callback])

  return ref
}
