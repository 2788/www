import BaseFetchStore, * as base from 'admin-base/common/stores/fetch'
import { formatURL } from 'admin-base/common/utils/url'
import TokenStore from 'admin-base/user/stores/token'
import { HttpMethod } from 'constants/api-prefix'

export * from 'admin-base/common/stores/fetch'

export default class FetchStore extends BaseFetchStore {

  // TODO: 继承的话，子类需要把父类声明的依赖再复述一遍
  // 考虑下是不是可以同组合的方式解决（考虑现在通过继承实现的能力如何实现）@nighca
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(tokenStore: TokenStore) {
    super(tokenStore)
  }

  produceInput(url: string, options?: base.IOptions) {
    const messageMap = {
      ...options && options.messageMap
    }

    return super.produceInput(url, {
      ...options,
      messageMap
    })
  }

  async produceResult(statusCode: number, body: string, fetchItem: base.IFetchItem) {
    // 删除时，无返回内容，也应返回正确结果
    if (statusCode === 204) {
      return null
    }
    const result = await super.produceResult(statusCode, body, fetchItem)
    return result

  }

  delete(url: string, options?: object) {
    return super.fetch(formatURL(url, options), { method: HttpMethod.DELETE })
  }
}
