/**
 * @file user apis
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

import { proxyGaea } from 'constants/proxy'

export interface IFetchUserInfoOptions {}
export interface IUserInfo {
  uid: number
  customer_name: string
  customer_email: string
  signup_time: string
  mobile: string
}

@injectable()
export default class UserApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  getUserInfo(options?: IFetchUserInfoOptions): Promise<IUserInfo> {
    return this.fetchStore.get(`${proxyGaea}/api/developer-view/overview`, { ...options })
  }
}
