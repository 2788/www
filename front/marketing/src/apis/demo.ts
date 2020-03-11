/**
 * @file demo apis
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

export interface IFetchDemoOptions {}
export interface IFetchDemoResult {
  b: number
}

@injectable()
export default class DemoApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  getDemo(options?: IFetchDemoOptions): Promise<IFetchDemoResult> {
    return this.fetchStore.get('/get-demo', { ...options })
  }
}
