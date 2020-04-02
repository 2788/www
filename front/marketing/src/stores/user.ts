/**
 * @file user store
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { observable, action } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import UserApis, { IUserInfo } from 'apis/user'

enum Loading {
  GetUserInfo = 'getUserInfo'
}

@injectable()
export default class UserStore extends Store {
  constructor(
    toasteStore: ToasterStore,
    private userApis: UserApis
  ) {
    super()
    ToasterStore.bind(this, toasteStore)
  }

  Loading = Loading
  loadings = Loadings.collectFrom(this, this.Loading)

  @observable.ref uid: number | undefined
  @observable.ref customerEmail: string | undefined
  @observable.ref customerName: string | undefined
  @observable.ref signUpTime: string | undefined
  @observable.ref mobile: string | undefined
  @observable.ref isSignIn: boolean | undefined

  @action.bound
  private updateUserInfo(userinfo: IUserInfo) {
    const { uid, customer_name, customer_email, signup_time, ...otherUserInfo } = userinfo
    const target: Partial<UserStore> = {
      customerName: customer_name,
      customerEmail: customer_email,
      signUpTime: signup_time,
      isSignIn: !!(userinfo && uid),
      ...otherUserInfo
    }
    Object.assign(this, target)
  }

  @Loadings.handle(Loading.GetUserInfo)
  async fetchUserInfo() {
    const req = this.userApis.getUserInfo()
    req.then(this.updateUserInfo)
    return req
  }

  init() {
    this.fetchUserInfo()
  }
}
