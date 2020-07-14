/**
 * @file 定时任务相关
 */

import { useState } from 'react'
import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect'

export function useNow() {
  // TODO: 初始值考虑从服务器（构建）时间得到
  const [now, setNow] = useState(1594694600676)
  // TODO: 考虑定时更新 now
  useIsomorphicLayoutEffect(() => {
    setNow(Date.now())
  }, [])
  return now
}

// https://jira.qiniu.io/browse/BO-13091
const kodoPackageDeadline = +new Date('2020-07-19T00:00:00+08:00')

export function useKodoPackage() {
  const now = useNow()
  return now < kodoPackageDeadline
}
