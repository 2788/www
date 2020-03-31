/**
 * @file component Header
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'
import { useInjection } from 'qn-fe-core/di'
import { useLocalStore } from 'qn-fe-core/local-store'

import UserStore from 'stores/user'

import HeaderStore from './store'
import './style.less'

export interface IProps {
  //
}

export default observer(function Header(props: IProps) {
  const userStore = useInjection(UserStore)
  const headerStore = useLocalStore(HeaderStore, props)

  const { isWindowScroll } = headerStore

  return (
    <header className={ isWindowScroll ? 'header-wrapper active' : 'header-wrapper' }>
      Header Wrapper
      {userStore.isSignIn && ' - ' + userStore.customerName}
    </header>
  )
})
