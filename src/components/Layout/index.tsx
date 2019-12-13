/*
 * @file component Layout
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import * as React from 'react'
import { observer } from 'mobx-react'

import registerRouteTitle from 'portal-base/common/enhancers/route-title'

import './style.less'

@registerRouteTitle('活动')
@observer
export default class Layout extends React.Component<any, any> {
  render() {
    return (
      <div className="comp-layout">
        <div className="main-wrapper">
          <div className="content-wrapper">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
