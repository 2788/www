/*
 * @file store Activity
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, autorun, runInAction } from 'mobx'

import Store from 'qn-fe-core/store'

import { IActivityProps } from 'components/Activity'

export class ActivityStore extends Store {

  @observable activityID: string = ''

  constructor(getProps: any) {
    super()

    this.addDisposer(autorun(() => {
      const props: IActivityProps = getProps()
      runInAction(() => {
        this.activityID = props.id || ''
      })
    }))
  }
}
