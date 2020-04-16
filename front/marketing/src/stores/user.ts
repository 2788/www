/**
 * @file user store
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { observable, action, computed } from 'mobx'
import { injectable } from 'qn-fe-core/di'
import Store from 'qn-fe-core/store'
import Loadings from 'base/stores/loadings'
import ToasterStore from 'base/stores/toaster'

import UserApis, { IUserInfo } from 'apis/user'
import SensorsApis from 'apis/sensors'

enum Loading {
  GetUserInfo = 'getUserInfo'
}

@injectable()
export default class UserStore extends Store {
  constructor(
    toasteStore: ToasterStore,
    private userApis: UserApis,
    private sensorsApis: SensorsApis
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

  @action.bound
  private updateUserInfo(userinfo: IUserInfo) {
    const { customer_name, customer_email, signup_time, ...otherUserInfo } = userinfo
    const target: Partial<UserStore> = {
      customerName: customer_name,
      customerEmail: customer_email,
      signUpTime: signup_time,
      ...otherUserInfo
    }
    Object.assign(this, target)

    this.reportLoginStatus()
  }

  @computed get isSignIn() {
    return !!this.uid
  }

  @action reportLoginStatus() {
    if (!this.isSignIn) {
      return
    }

    this.sensorsApis.login(this.uid + '')
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
