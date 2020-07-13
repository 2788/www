import { stringify } from 'query-string'

/** 判断当前是否在浏览器中执行，与之对应的是在 Node.js 环境执行（生成静态页面时） */
export function isBrowser() {
  // https://github.com/zeit/next.js/issues/5354#issuecomment-520305040
  return typeof window !== 'undefined'
}

export type UrlParams = {
  [key: string]: string | number | null | undefined
}

export function urlFor(url: string, params: UrlParams = {}) {
  const querystring = stringify(params, { skipNull: true })
  const sep = url.indexOf('?') >= 0 ? '&' : '?'
  if (querystring) {
    url += sep + querystring
  }
  return url
}

export function timeout(delay = 1000) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export function getCurrentYear() {
  return new Date().getFullYear()
}

/** 判断给定字符串内容是否 URL */
export function isUrl(input: string) {
  return /^https?:\/\/.+/.test(input)
}
