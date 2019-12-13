/*
 * @file component All
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import * as React from 'react'
import { observer } from 'mobx-react'

@observer
export default class All extends React.Component<any, any> {
  render() {
    return (
      <h1>Hello world</h1>
    )
  }
}
