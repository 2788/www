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

  @observable.ref activityId = window.location.pathname.split('/').slice(-1)[0] // TODO: 临时代码；最好在 pageData 里
  @observable.ref pageData: typeof window.pageData | undefined

  init(pageData: typeof window.pageData) {
    this.pageData = pageData

    this.componentApiServie.fetchList(this.pageData)
  }

  constructor(private componentApiServie: ComponentApiServie) {
    super()
  }
}
