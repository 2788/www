/*
 * @file store Header
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, action } from 'mobx'

import Store from 'qn-fe-core/store'
import { injectable } from 'qn-fe-core/di'
import { injectProps } from 'qn-fe-core/local-store'

// TODO: -> local store
import { IProps } from 'components/App/Layout/Header'

@injectable()
export default class HeaderStore extends Store {

  constructor(
    @injectProps() private props: IProps
  ) {
    super()
  }

  @observable isWindowScroll: boolean = false

  @action bindWindowScroll() {
    window.addEventListener('scroll', (e: any) => {
      this.handleWindowScroll(e)
    }, true)
    this.addDisposer(() => this.unbindWindowScroll())
  }

  @action unbindWindowScroll() {
    window.removeEventListener('scroll', (e: any) => {
      this.handleWindowScroll(e)
    })
  }

  @action handleWindowScroll(e: any) {
    const scrollTop: number = e.target.scrollTop || 0
    if (!scrollTop) {
      this.isWindowScroll = false
      return
    }
    this.isWindowScroll = true
  }

  init() {
    this.bindWindowScroll()
    console.log(this.props) // TODO
  }
}
