/**
 * @file hover 相关 hooks
 */

import { useMemo } from 'react'

/** 生成用于捕捉 hover 事件的 handler */
export function useHoverHandlers(onHover?: (hovered: boolean) => void) {
  return useMemo(() => {
    if (onHover == null) return undefined
    return {
      onMouseEnter: () => onHover(true),
      onMouseLeave: () => onHover(false)
    }
  }, [onHover])
}
