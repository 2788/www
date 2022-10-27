/**
 * @file BDVidReporter 组件
 * @author jiayizhen <jiayizhen@qiniu.com>
 * @description 如果 url 中包含 bd_vid query 参数，则前端种 bd_logid_url cookie
 */

import { useEffect } from 'react'
import { parse } from 'query-string'
import dayjs from 'dayjs'

import { isBrowser, getTopLevelDomain } from 'utils'

export default function BDVidReporter() {
  // 如果 url 有 bd_vid query 参数
  // 则前端种 bd_logid_url cookie，值为当前 url
  // 种在一级域名下，有效期为 72h（3 天）
  // https://jira.qiniu.io/browse/UG-936
  // TODO: 后续将种 cookie 的逻辑实现在后端
  const cookieKey = 'bd_logid_url'

  useEffect(() => {
    if (!isBrowser()) {
      return
    }

    // 注意，这边不能使用 useQueryValue 来获取 url 中的 bd_vid query 值
    // 因为在 例如：externals 组件中路由不能反映当前页面的 url
    // 用 useQueryValue 会出现取不到值的情况
    const parsedSearchObj = parse(window.location.search)
    let bdVid = parsedSearchObj.bd_vid

    // 如果 bd_vid 为一个数组
    // 则取第一个有效的值
    if (Array.isArray(bdVid)) {
      bdVid = bdVid.find(item => !!item)
    }

    if (!bdVid) return

    const currentUrl = window.location.href
    const topLevelDomain = getTopLevelDomain(currentUrl)

    if (!topLevelDomain) return

    const cookie = [
      `${cookieKey}=${currentUrl}`,
      `domain=${topLevelDomain}`,
      'path=/',
      `expires=${dayjs().add(3, 'days').toString()}`
    ]

    document.cookie = cookie.join('; ')
  }, [])

  return null
}
