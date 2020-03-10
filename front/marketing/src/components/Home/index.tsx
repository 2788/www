/*
 * @file component Home
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useRouterStore } from 'qn-fe-core/router'

export default observer(function Home() {
  const routerStore = useRouterStore()
  useEffect(() => routerStore.replace('/marketing/all'), [])
  return null
})
