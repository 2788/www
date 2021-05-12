/**
 * @file 上报 cps 访问信息组件
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { useEffect } from 'react'
import { parse } from 'query-string'

import { useApi } from 'hooks/api'

import { reportCpsVisit } from 'apis/cps'

export default function CpsVisitReporter() {
  // 如果 url 有 cps_key query 参数
  // 则调用后端接口种下对应的 cookie
  // https://jira.qiniu.io/browse/BO-15948
  const { call: callReportCpsVisit } = useApi(reportCpsVisit)

  useEffect(() => {
    // 注意，这边不能使用 useQueryValue 来获取 url 中的 cps_key query 值
    // 因为在 例如：externals 组件中路由不能反映当前页面的 url
    // 用 useQueryValue 会出现取不到值的情况
    const parsedSearchObj = parse(window.location.search)
    let cpsKey = parsedSearchObj.cps_key

    // 如果 cps_key 为一个数组
    // 则取第一个有效的值
    if (Array.isArray(cpsKey)) {
      cpsKey = cpsKey.find(item => !!item)
    }

    if (!cpsKey) return

    callReportCpsVisit({
      cps_key: cpsKey
    })
  }, [callReportCpsVisit])

  return null
}