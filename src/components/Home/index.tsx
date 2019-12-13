/*
 * @file component Home
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import * as React from 'react'
import { observer } from 'mobx-react'

import routerStore from 'portal-base/common/stores/router'

@observer
export default class Home extends React.Component<any, any> {
  componentDidMount() {
    routerStore.replace('/marketing/all')
  }

  render() {
    return null
  }
}
