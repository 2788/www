/**
 * @file 对 fetch 的简单封装
 * @description 只针对请求体 & 响应体都是 JSON 的情况
 */

import { host } from 'constants/env'
import { urlFor, UrlParams, isBrowser } from '.'

// FIXME: 有了 `public data` 那么 `response` 就毫无意义了啊 @renpanpan5
//        而且 `response` 也不是 `Response` 的子集为啥要叫 `response`
export class ApiException<T> extends Error {
  response: { data: T }
  constructor(
    public data: T,
    public message: string,
    public code?: number | string
  ) {
    super(message)
    this.response = { data }
  }
}

export async function fetchJSON(info: RequestInfo, init?: RequestInit) {
  const fetched = await fetch(info, {
    credentials: 'include',
    mode: 'cors',
    ...init,
    headers: {
      // 为服务端渲染时发出的请求添加 Referer 信息，以免被 API proxy 拒掉
      ...(isBrowser() ? null : { Referer: host }),
      ...(init?.body !== undefined && { 'Content-Type': 'application/json' }),
      ...init && init.headers
    }
  })

  const body = await fetched.text()

  if (!fetched.ok) {
    let data: any = null
    try {
      data = parseBody(body)
    } catch { /** do nothing */ }
    throw new ApiException(data, `Fetch failed with status ${fetched.status}.`, fetched.status)
  }

  try {
    return parseBody(body)
  } catch (e) {
    throw new Error('Fetch failed with invalid response.')
  }
}

function parseBody(body: string) {
  // 兼容 body 为空的情况
  if (!body.trim()) {
    return null
  }
  return JSON.parse(body)
}

export function get(url: string, params?: UrlParams, init?: RequestInit) {
  return fetchJSON(urlFor(url, params), init)
}

export function post(url: string, params: object, init?: RequestInit) {
  return fetchJSON(url, {
    ...init,
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export function getCode(error: unknown): number | string | undefined {
  if (error instanceof ApiException) {
    return error.code
  }

  if (error instanceof Error) {
    return error.name
  }
}

export function getMessage(error: unknown): string | undefined {
  if (error instanceof ApiException) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }
}

export function normalizeErrorMessage(
  code: number | string | undefined,
  detailMessage: string | undefined,
  baseMessage?: string
): string {
  const errCode = code ? `[${code}]` : ''
  const message = [baseMessage, detailMessage].filter(Boolean).join('：')
  return [errCode, message].filter(Boolean).join(' ')
}

export function getNormalizedErrorMessage(error: unknown, msg?: string) {
  const code = getCode(error)
  const message = getMessage(error)
  return normalizeErrorMessage(code, message, msg)
}
