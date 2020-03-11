/*
 * @file component Header
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import './style.less'

import { HeaderStore } from 'stores/header'

@observer
export default class Header extends React.Component<any, any> {

  store = new HeaderStore()

  componentDidMount() {
    this.store.bindWindowScroll()
  }

  componentWillUnmount() {
    this.store.unbindWindowScroll()
    this.store.dispose()
  }

  render() {
    const { isWindowScroll } = this.store
    return (
      <div className={ isWindowScroll ? 'header-wrapper active' : 'header-wrapper' }>
        Header Wrapper
      </div>
    )
  }
}
