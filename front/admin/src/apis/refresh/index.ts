/**
 * @file 刷新工具
 * @author lizhifeng <lizhifeng@qiniu.com>
 */

// 文档：https://github.com/qbox/www/blob/2020/admin-backend/apis.md
// TODO: 注意，目前 refresh 的实现不是很完整，刷新 `/pgc` 并不会处理 `/pgc//` `/pgc?x=1` `/pgc#y=1` 等特殊情况

import { injectable } from 'qn-fe-core/di'
import Client, { Output, InternalOptions, ApiException, HttpException } from 'qn-fe-core/client'
import { UnknownException, getMessage } from 'qn-fe-core/exception'
import { BaseClient as AdminBaseClient, defaultMessageMap } from 'admin-base/common/apis/base'

import { validatePath } from 'transforms/deploy/refresh'

const refreshPrefix = '/api/www/refresher'

export enum ErrorCode {
  ExceedLengthLimitForRefresh = 400014, // 超过 refresh 输入参数长度限制
  InvalidPaths = 400015, // 不合法的 path 列表
  ExceedLengthLimitForPrefixRefresh = 400016 // 超过前缀刷新输入参数长度限制（50）
}

export const errorMessages = {
  [ErrorCode.ExceedLengthLimitForRefresh]: '超过路径数量限制（200）',
  [ErrorCode.InvalidPaths]: '存在非法路径',
  [ErrorCode.ExceedLengthLimitForPrefixRefresh]: '超过路径数量限制（50）'
} as const

// TODO: 优化 message 提示信息
export function getRefreshErrorMessage(reason: string | null | undefined) {
  return '官网刷新服务相关请求失败' + (reason ? '：' + reason : '')
}

interface RefreshError {
  code: ErrorCode
  message?: string
}

function isRefreshError(body: any): body is RefreshError {
  return body && typeof body.code === 'number'
}

export class RefreshApiException extends ApiException {
  constructor(cause: HttpException) {
    const [code, message] = isRefreshError(cause.payload)
      ? [cause.payload.code, getRefreshErrorMessage(errorMessages[cause.payload.code] ?? cause.payload.message)]
      : [cause.code, getRefreshErrorMessage(defaultMessageMap[cause.code])]
    super('RefreshApiException', code, message, undefined, cause)
  }
}

@injectable()
export class RefreshClient extends Client {
  constructor(private adminBaseClient: AdminBaseClient) {
    super()
  }

  protected async _send(url: string, options: InternalOptions): Promise<Output> {
    let result: Output
    try {
      result = await this.adminBaseClient.send(refreshPrefix + url, options)
    } catch (err: unknown) {
      throw err instanceof HttpException
        ? new RefreshApiException(err)
        : new UnknownException(getRefreshErrorMessage(getMessage(err)), err)
    }
    return result
  }

  refreshPaths(paths: string[]): Promise<unknown> {
    return this.post('/refresh', { paths })
  }

  refreshByPrefixes(paths: string[]): Promise<unknown> {
    return this.post('/refresh/prefix', { paths })
  }

  async refresh(paths: string[], withSub: boolean): Promise<void> {
    const files: string[] = []
    const folders: string[] = []

    for (const path of paths) {
      const result = validatePath(path)
      if (result) {
        throw new Error(result)
      }

      if (withSub && path !== '') { // 首页
        folders.push(path)
      } else {
        files.push(path)
      }
    }

    const tasks: Array<Promise<unknown>> = []

    if (files.length > 0) {
      // eslint-disable-next-line no-console
      console.info('Start refresh files:', files)
      tasks.push(this.refreshPaths(files))
    }

    if (folders.length > 0) {
      // eslint-disable-next-line no-console
      console.info('Start refresh folders:', folders)
      tasks.push(this.refreshByPrefixes(folders))
    }

    await Promise.all(tasks)
  }
}
