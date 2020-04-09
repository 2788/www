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

  // demo mock 数据原本放在 api/get-demo 文件中
  // 接口联调完成后移除了所有的 mock 数据
  // 原本 get-demo mock 数据的格式为
  // {
  //   "code": 200,
  //   "data": {
  //     "b": 333
  //   }
  // }
  getDemo(options?: IFetchDemoOptions): Promise<IFetchDemoResult> {
    return this.fetchStore.get('/get-demo', { ...options })
  }
}
