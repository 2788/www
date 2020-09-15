/**
 * @file 对 fetch 的简单封装
 * @description 只针对请求体 & 响应体都是 JSON 的情况
 */

import { host } from 'constants/env'
import { urlFor, UrlParams, isBrowser } from '.'

export async function fetchJSON(info: RequestInfo, init?: RequestInit) {
  const fetched = await fetch(info, {
    credentials: 'include',
    mode: 'cors',
    ...init,
    headers: {
      // 为服务端渲染时发出的请求添加 Referer 信息，以免被 API proxy 拒掉
      ...(isBrowser() ? null : { Referer: host }),
      'Content-Type': 'application/json',
      ...init && init.headers
    }
  })

  const body = await fetched.text()

  if (!fetched.ok) {
    const e = new Error(`Fetch failed with status ${fetched.status}.`)
    let data: any = null
    try {
      data = parseBody(body)
    } catch { /** do nothing */ }
    const response = { data };
    (e as any).response = response
    throw e
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
