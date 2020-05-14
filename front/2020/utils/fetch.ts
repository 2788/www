/**
 * @file 对 fetch 的简单封装
 * @description 只针对请求体 & 响应体都是 JSON 的情况
 */

import { urlFor, UrlParams } from '.'

export async function fetchJSON(info: RequestInfo, init?: RequestInit) {
  const fetched = await fetch(info, {
    credentials: 'include',
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init && init.headers
    }
  })
  return fetched.json()
}

export function get(url: string, params?: UrlParams) {
  return fetchJSON(urlFor(url, params))
}

export function post(url: string, params: object) {
  return fetchJSON(url, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}
