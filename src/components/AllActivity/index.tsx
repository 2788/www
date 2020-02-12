/*
 * @file component All Activity Page
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import * as React from 'react'
import { observer } from 'mobx-react'

import './style.less'

@observer
export default class AllActivity extends React.Component<any, any> {
  render() {
    return (
      <div className="all-activity-wrapper">
        <div className="list-wrapper">
          { this.renderAllActivityList() }
        </div>
      </div>
    )
  }

  renderAllActivityList(): JSX.Element[] {
    const allActivityDomList: JSX.Element[] = []
    for (let i: number = 0; i < 50; i++) {
      allActivityDomList.push(<p key={ 'activity-' + (i + 1) }>All Activity List Page.</p>)
    }
    return allActivityDomList
  }
}
