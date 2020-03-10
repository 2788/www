/**
 * @file fetch store
 * @author nighca <nighca@live.cn>
 */

import * as qs from 'querystring'
import { injectable } from 'qn-fe-core/di'
import BaseFetchStore, * as base from 'qn-fe-core/fetch-store'
import defaultMessageMap from '../constants/error-code-messages'
import { formatURL } from '../utils/url'

export * from 'qn-fe-core/fetch-store'

@injectable()
export default class FetchStore extends BaseFetchStore {

  constructor() {
    super()
    this.fetch = this.fetch.bind(this)
    this.get = this.get.bind(this)
    this.postJSON = this.postJSON.bind(this)
    this.putJSON = this.putJSON.bind(this)
    this.patchJSON = this.patchJSON.bind(this)
    this.deleteJSON = this.deleteJSON.bind(this)
  }

  produceInput(url: string, options?: base.IOptions) {
    const messageMap = {
      ...defaultMessageMap,
      ...options && options.messageMap
    }
    options = {
      credentials: 'include', // 默认带上 cookie
      ...options,
      headers: {
        ...(options && options.headers)
      },
      messageMap
    }
    return super.produceInput(url, options)
  }

  get(url: string, params: object, options?: base.IOptions): Promise<any> {
    return this.fetch(
      formatURL(url, params),
      { method: 'GET', ...options }
    )
  }

  postJSON(url: string, body: object, options?: base.IOptions): Promise<any> {
    return this.fetch(url, {
      ...initForJSON(body),
      method: 'POST',
      ...options
    })
  }

  putJSON(url: string, body: object, options?: base.IOptions): Promise<any> {
    return this.fetch(url, {
      ...initForJSON(body),
      method: 'PUT',
      ...options
    })
  }

  patchJSON(url: string, body: object, options?: base.IOptions): Promise<any> {
    return this.fetch(url, {
      ...initForJSON(body),
      method: 'PATCH',
      ...options
    })
  }

  deleteJSON(url: string, body: object, options?: base.IOptions): Promise<any> {
    return this.fetch(url, {
      ...initForJSON(body),
      method: 'DELETE',
      ...options
    })
  }
}

// 区别于 FormData
export function initForFormUrlEncoded(body: object) {
  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify(body)
  }
}

export function initForJSON(body: object) {
  return {
    headers: {
      'Content-Type': 'application/json'
    } as any,
    body: JSON.stringify(body)
  }
}
