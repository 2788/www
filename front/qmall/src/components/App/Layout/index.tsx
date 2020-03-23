/*
 * @file component Layout
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import Header from './Header'

import './style.less'

@observer
export default class Layout extends React.Component<any, any> {
  render() {
    return (
      <div className="comp-layout">
        <div className="main-wrapper">
          <Header />
          <div className="content-wrapper">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
