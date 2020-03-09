/**
 * @file component NotFound
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { useRouterStore } from 'qn-fe-core/router'

// TODO 我觉得任意路由无法命中 缺省都去 404

export default function NotFound(): null {

  const routerStore = useRouterStore()

  React.useEffect(() => {
    const href = routerStore.history.createHref(routerStore.location)

    routerStore.push({
      pathname: '/404',
      search: `?from=${encodeURIComponent(href)}`
    })
  })

  return null
}
