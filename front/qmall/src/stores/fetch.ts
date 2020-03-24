/**
 * @file fetch store for linking-admin default fetch
 * @author nighca <nighca@live.cn>
 */

import { Exception } from 'qn-fe-core/exception'
import BaseFetchStore, * as base from '../base/stores/fetch'
import apiPrefix from '../constants/api-prefix'
// import { errorCodeMapping as defaultMessageMap } from 'constants/error-code'

export * from '../base/stores/fetch'

/* eslint-disable import/namespace */

export enum AddonExceptionName {
  InvalidArgs = 'invalid args',
  MissingRealFetch = 'missing real fetch'
}

export type ExceptionName = base.ExceptionName | AddonExceptionName
export const ExceptionName = { ...base.ExceptionName, ...AddonExceptionName }

// 接口返回的 body 结构
export interface ICommonFetchResult<T = any> {
  code: number
  data: T
  message?: string
}

export function isCommonFetchResult(result: any): result is ICommonFetchResult {
  return !!(result && typeof result.code === 'number')
}

export interface IApiException extends base.IApiException {
  detail: base.IApiExceptionDetail | ICommonFetchResult
}

export function isApiException(caught: any): caught is IApiException {
  return base.isApiException(caught)
}

export default class FetchStore extends BaseFetchStore {
  produceInput(url: string, options?: base.IOptions) {
    const messageMap = {
      // ...defaultMessageMap,
      ...options && options.messageMap
    }
    return super.produceInput(apiPrefix + url, {
      ...options,
      messageMap
    })
  }

  async produceResult(statusCode: number, body: string, fetchItem: base.IFetchItem) {
    const result = await super.produceResult(statusCode, body, fetchItem)
    if (!isCommonFetchResult(result)) {
      throw new Exception(base.ExceptionName.InvalidResponse, '响应正文（body）内容格式不正确', result)
    }
    if (result.code !== 200) {
      throw base.makeApiException(result)
    }
    return result.data
  }
}
