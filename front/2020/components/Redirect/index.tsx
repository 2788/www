/**
 * @file 重定向组件 index.tsx
 * @description 包含重定向
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { useEffect } from 'react'
import { parse } from 'query-string'

import { useRouter } from 'next/router'
import { useHash } from 'hooks/url'

import { checkInSite } from 'utils/route'

export type Props = {
  target: string
  keepQuery?: boolean
}

export default function Redirect(props: Props) {
  const { target, keepQuery = true } = props
  const [hash] = useHash()
  const router = useRouter()

  /** 重定向到 target */
  /** 默认带上 query && hash */
  useEffect(() => {
    const checked = checkInSite(target)
    if (!checked.inSite) {
      /** 如果 target 为外部站点 */
      /** 直接用 window.location.href 重定向 */
      window.location.href = target
      return
    }

    const { query, replace } = router
    const pathname = target.split('?')[0]
    const targetQuery = parse(target.split('?')[1] || '')

    replace({
      pathname,
      query: { ...(keepQuery && query), ...targetQuery },
      hash
    })
  }, [target, router, hash, keepQuery])

  return null
}
