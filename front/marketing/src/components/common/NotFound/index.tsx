/**
 * @file component NotFound 404
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React, { useEffect } from 'react'
import { useRouterStore } from 'qn-fe-core/router'
import { basename } from 'constants/route'

import * as styles from './style.m.less'

export default function NotFound() {

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.img}></div>
    </div>
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
