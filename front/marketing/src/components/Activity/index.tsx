/*
 * @file component Activity Page
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React from 'react'
import { observer } from 'mobx-react'

import './style.less'

import { ActivityStore } from 'stores/activity'

import Renderer from 'components/common/Renderer'

export interface IActivityProps {
  id: string
}

@observer
export default class Activity extends React.Component<IActivityProps, any> {

  store = new ActivityStore(() => this.props)

  componentWillUnmount() {
    this.store.dispose()
  }

  render() {
    const { activityID } = this.store
    return (
      <div className="activity-wrapper">
        <p>活动 ID：{ activityID }</p>
        <Renderer />
      </div>
    )
  }
}
