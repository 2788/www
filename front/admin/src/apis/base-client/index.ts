/**
 * @file base client
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

import { injectable } from 'qn-fe-core/di'
import Client, { Output, Options, InternalOptions } from 'qn-fe-core/client'
import { BaseClient as AdminBaseClient } from 'admin-base/common/apis/base'

import { wwwPaths } from 'constants/deploy/refresh'
import { RefreshClient } from 'apis/refresh'

export { Output }

export type WwwRefreshPath = (typeof wwwPaths)[number]

export interface RefreshOptions {
  /** 标记官网哪些路径前缀对应的页面用到了相关数据（需要刷新） */
  wwwRefresh: WwwRefreshPath[]
}

export interface BaseClientOptions extends Options, RefreshOptions {}
export interface BaseInternalOptions extends InternalOptions, RefreshOptions {}
export interface BaseOptions extends Partial<Omit<BaseClientOptions, 'id'>> {}

@injectable()
export default class BaseClient extends Client<unknown, unknown, Output, BaseClientOptions> {
  constructor(
    private adminBaseClient: AdminBaseClient,
    private refreshClient: RefreshClient
  ) {
    super()
  }

  protected async _send(url: string, options: BaseInternalOptions): Promise<Output> {
    const { wwwRefresh, ...baseOptions } = options

    // 写操作
    const isWritten = (
      baseOptions.method != null
      && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(baseOptions.method.toUpperCase())
    )

    if (isWritten && wwwRefresh.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('未指定有效刷新目录')
    }

    const result = await this.adminBaseClient.send(url, baseOptions)

    if (wwwRefresh && wwwRefresh.length > 0) {
      await this.refreshClient.refresh(wwwRefresh, true)
    }

    return result
  }

  post<T>(url: string, payload: unknown, options: BaseOptions) {
    return super.post<T>(url, payload, options)
  }

  put<T>(url: string, payload: unknown, options: BaseOptions) {
    return super.put<T>(url, payload, options)
  }

  patch<T>(url: string, payload: unknown, options: BaseOptions) {
    return super.patch<T>(url, payload, options)
  }

  delete<T>(url: string, options: BaseOptions) {
    return super.delete<T>(url, options)
  }
}
