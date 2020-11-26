/**
 * @file 定时任务相关
 */

import { useState } from 'react'
import { builtAt } from 'constants/env'
import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect'

export function useNow() {
  const [now, setNow] = useState(builtAt)
  // TODO: 考虑定时更新 now
  useIsomorphicLayoutEffect(() => {
    setNow(Date.now())
  }, [])
  return now
}
