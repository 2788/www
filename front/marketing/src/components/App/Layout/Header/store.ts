/**
 * @file local store of component Header
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { observable, action, computed } from 'mobx'

import Store from 'qn-fe-core/store'
import { injectable } from 'qn-fe-core/di'
// import { injectProps } from 'qn-fe-core/local-store'

import { reactionGlobalScrollY } from 'utils/dom'

// import { IProps } from '.'

@injectable()
export default class HeaderStore extends Store {

  constructor(
    // @injectProps() private props: IProps
  ) {
    super()
  }

  @observable isWindowScrolled = false
  @observable isSubMenuActive = false

  @computed get isHeaderActive() {
    return this.isWindowScrolled || this.isSubMenuActive
  }

  @action.bound setSubMenuActiveState(isActive: boolean) {
    this.isSubMenuActive = isActive
  }

  @action.bound handleWindowScroll(offset: number) {
    this.isWindowScrolled = offset > 0
  }

  init() {
    this.addDisposer(reactionGlobalScrollY(this.handleWindowScroll))
  }
}
