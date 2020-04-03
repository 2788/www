/**
 * @file local store of component Header
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { observable, action, computed } from 'mobx'

import Store from 'qn-fe-core/store'
import { injectable } from 'qn-fe-core/di'
import { injectProps } from 'qn-fe-core/local-store'

import { IProps } from '.'

@injectable()
export default class HeaderStore extends Store {

  constructor(
    @injectProps() private props: IProps
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

  @action bindWindowScroll() {
    window.addEventListener('scroll', this.handleWindowScroll)
    this.addDisposer(() => window.removeEventListener('scroll', this.handleWindowScroll))
  }

  @action.bound handleWindowScroll(e: any) {
    const scrollTop: number = (
      e.target.scrollTop
      || window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop
      || 0
    )
    this.isWindowScrolled = scrollTop > 0
  }

  init() {
    this.bindWindowScroll()
    if (false) { console.log(this.props) } // TODO
  }
}
