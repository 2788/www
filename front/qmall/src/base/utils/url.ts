import * as qs from 'querystring'
import { size } from 'lodash'

export function formatURL(url: string, params: any) {
  let query = ''

  if (size(params) !== 0) {
    query = url.indexOf('?') > -1 ? `&${qs.stringify(params)}` : `?${qs.stringify(params)}`
  }

  return `${url}${query}`
}

export function parseSearch(search: string): any {
  const query = qs.parse(
    search
    ? search.slice(1)
    : ''
  )

  if (Array.isArray(query)) {
    // portal base 升级 node 版本（7.X -> 8.X）后更新了 parse 方法的返回类型
    // parse(***): any => parse(***): ParsedUrlQuery
    // 为了和现有的代码类型上保持兼容、我们修改了此处的返回类型为 any 来保持与过去一致
    console.error('Function parseSearch cannot handle array-typed querystring value.')
  }

  return query
}

export function safeDecodeURIComponent(uriComponent: string): string {
  return decodeURIComponent(uriComponent.replace(/\+/g, ' '))
}
