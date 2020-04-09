/*
 * @file component Layout
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import Header from './Header'
import Footer from './Footer'

@observer
export default class Layout extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
