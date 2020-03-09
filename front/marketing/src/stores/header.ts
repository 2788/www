/*
 * @file store Header
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { observable, action } from 'mobx'

import Store from 'qn-fe-core/store'

export class HeaderStore extends Store {

  @observable isWindowScroll: boolean = false

  @action bindWindowScroll() {
    window.addEventListener('scroll', (e: any) => {
      this.handleWindowScroll(e)
    }, true)
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
}
