/**
 * @file 重定向组件 index.tsx
 * @description 包含重定向
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { useEffect } from 'react'
import { parse } from 'query-string'

import { useRouter } from 'next/router'
import { useHash } from 'hooks/url'

export type Props = {
  target: string
}

export default function Redirect(props: Props) {
  const { target } = props
  const [hash] = useHash()
  const router = useRouter()

  /** 重定向到 target */
  /** 默认带上 query && hash */
  useEffect(() => {
    const { query, replace } = router
    const pathname = target.split('?')[0]
    const targetQuery = parse(target.split('?')[1] || '')

    replace({
      pathname,
      query: { ...query, ...targetQuery },
      hash
    })
  }, [target, router, hash])

  return null
}
