/**
 * @file 浏览器相关 hooks
 */

import { useState, useEffect } from 'react'

/** 获取是否移动端信息 */
export function useMobile() {
  // 初始状态使用 false，以保持客户端渲染跟静态（服务端）渲染逻辑的一致
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function syncIsMobile() {
      setIsMobile(getIsMobile())
    }
    syncIsMobile()
    window.addEventListener('resize', syncIsMobile)
    return () => window.removeEventListener('resize', syncIsMobile)
  }, [])

  return isMobile
}

function getIsMobile() {
  return (
    typeof window !== 'undefined'
    // 同 utils/style.less `.mobile()` 实现
    && window.matchMedia('(max-width: 767px)').matches
  )
}
