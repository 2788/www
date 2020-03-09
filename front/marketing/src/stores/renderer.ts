/**
 * @file componnet renderer
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { observable } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import ComponentApiServie from 'apis/component'

@injectable()
export default class Renderer extends Store {

  @observable.ref pageData: typeof window.pageData

  init(pageData: typeof window.pageData) {
    this.pageData = pageData

    this.componentApiServie.fetchList(this.pageData)
  }

  constructor(private componentApiServie: ComponentApiServie) {
    super()
  }
}
