/**
 * @file component NotFound 404
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect } from 'react'
import { useRouterStore } from 'qn-fe-core/router'
import { basename } from 'constants/route'

export default function NotFound() {
  // TODO: 样式
  return (
    <p>活动已结束</p>
  )
}

export const notFoundPagePath = '/not-found'

export function ToNotFound(): null {
  const routerStore = useRouterStore()

  useEffect(() => {
    const href = routerStore.history!.createHref(routerStore.location!)

    routerStore.push({
      pathname: `${basename}${notFoundPagePath}`,
      search: `?from=${encodeURIComponent(href)}`
    })
  })

  return null
}
