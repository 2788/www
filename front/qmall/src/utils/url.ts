// export * from 'base/utils/url' TODO这里不是很明白，暂时注释

type ValidationResponse = string | null | undefined | false
export type URLObjectLike = URL | HTMLAnchorElement

export type HttpProtocols
  = '//'
  | 'http' | 'HTTP' | 'Http' | 'https' | 'HTTPS' | 'Https'
  | 'http:' | 'HTTP:' | 'Http:' | 'https:' | 'HTTPS:' | 'Https:'
  | 'http://' | 'HTTP://' | 'Http://' | 'https://' | 'HTTPS://' | 'Https://'

// TODO: 是否应该支持 protocol relative URL 。。？
export function isURL(url: string): boolean {
  return !validateURL(url)
}

export function validateURL(url: string): ValidationResponse {
  // 奇怪的空白符
  if (/[\s\0\x08-\x0d\x85\xa0\u1680\u180e\u2000-\u200f\u2028\u2029\u202f\u205f\u2060\u3000\ufeff]/.test(url)) { // eslint-disable-line
    return '包含非法的空白字符'
  }

  let data: URL
  try {
    // polyfill 必须给力才敢这样
    // URL 也有一些基础性的校验功能、例如 ipv6 的格式
    data = new URL(url)
  } catch (error) {
    return '格式错误'
  }

  // 必须是 http/s 协议
  if (!(/^https?:$/i.test(data.protocol))) {
    return '仅支持 http、https 协议'
  }

  const validateHostname = (hostname: string) => {
    if (!hostname) {
      return 'hostname 不允许为空'
    }

    // 不允许连续的 .  :  [  ]
    if (/[:.\[\]]{2,}/.test(hostname)) { // eslint-disable-line
      return '格式错误、可能是因为包含连续的 . : [ ] 等字符'
    }

    // \u4e00-\u9fa5 非常古老、很多新加入的汉字不在其中
    // 但是：走到这里 URL 已经帮我们把汉字转译了、所以不需要考虑汉字
    // 如果要处理中文问题,可以查一下 Unified_Ideograph、Punycode 相关知识点
    if (hostname.length === 1) {
      if (/^[a-zA-Z0-9]$/.test(hostname)) {
        return false
      }
      return '格式错误、可能包含特殊字符'
    }

    if (!/^[\[a-zA-Z0-9]+/.test(hostname)) { // eslint-disable-line
      return 'hostname 的首字符不合法'
    }

    if (!/[\]a-zA-Z0-9]$/.test(hostname)) {
      return 'hostname 的末尾字符不合法'
    }

    if (!/[0-9a-zA-Z:.-]*/.test(hostname.slice(1, -1))) {
      return 'hostname 的中间包含不合法字符'
    }

    return false
  }

  return validateHostname(data.hostname)
}

export function getUrlWithProtocol(
  url: string,
  protocol?: HttpProtocols | '' | void // default to '', not window.location.protocol
): string {
  const protocolText = !protocol
    ? ''
    : protocol === '//'
      ? '//'
      : `${protocol.replace(/[:/]/g, '').toLowerCase()}://`

  return url.replace(
    /^(?:(?:https?:)?\/\/)?/i,
    protocolText
  )
}

export function getPort(url: URLObjectLike): string {
  if (url.port) {
    return url.port
  }

  const protocol = url.protocol.toLowerCase()
  if (protocol === 'http:') {
    return '80'
  }
  if (protocol === 'https:') {
    return '443'
  }

  return url.port
}

// 避开 decodeURIComponent 这个名字
export function safeDecodeURIComponent(uriComponent: string): string {
  return decodeURIComponent(uriComponent.replace(/\+/g, ' '))
}

// 按顺序组织 path，顺便过滤掉 void 以及进行 url encode
export function formatPath<
  // 排除复杂类型（复杂类型自行 stringify 包括 array）
  T extends { [key in string | number]: string | number | boolean | void }
>(
  // 之所以不选择 ...args 是为了预留扩展槽位，如定制自己的 encoder 或 filter 之类的
  orderedParams: Array<Partial<T>>
): string {
  /* eslint-disable no-confusing-arrow */
  return orderedParams
    .map(
      (query) => !query
        ? []
        : (
          Object.keys(query)
            .filter((key) => key && query[key] != null)
            .map((key) => encodeURIComponent(key) + '/' + encodeURIComponent(query[key] + ''))
        )
    )
    .reduce(
      (result, current) => result.concat(current),
      []
    )
    .join('/')
}

// 判断两个 url 字符串是否等价
export function urlEqual(url1: string, url2: string): boolean {
  if (url1 === url2) {
    return true
  }
  try {
    // 注：不需要做 port normalize 的事情，URL parse 的过程会做这个事情
    // 规范：https://url.spec.whatwg.org/#concept-basic-url-parser
    // 我们用的 polyfill：https://github.com/jsdom/whatwg-url/blob/master/src/url-state-machine.js
    const [normalized1, normalized2] = [url1, url2].map(
      (url) => new URL(url).href
    )
    return normalized1 === normalized2
  } catch {
    return false
  }
}
