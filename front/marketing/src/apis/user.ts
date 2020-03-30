/**
 * @file user apis
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import FetchStore from 'stores/fetch'

export interface IFetchUserInfoOptions {}
export interface IUserInfo {
  uid: number
  email: string
  full_name: string
  signup_time: number
  mobile: string
  is_signin: boolean
}

@injectable()
export default class UserApis extends Store {
  constructor(
    private fetchStore: FetchStore
  ) {
    super()
  }

  // TODO: 对接口
  getUserInfo(options?: IFetchUserInfoOptions): Promise<IUserInfo> {
    return this.fetchStore.get('/userinfo', { ...options })
  }
}
