/**
 * @file 上报 cps 访问信息组件
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import React, { useEffect } from 'react'

import { useQueryValue } from 'hooks/url'
import { useApi } from 'hooks/api'

import { reportCpsVisit } from 'apis/cps'

export default function CpsVisitReporter() {
  // 如果 url 有 cps_key query 参数
  // 则调用后端接口种下对应的 cookie
  // https://jira.qiniu.io/browse/BO-15948
  const [cpsKey] = useQueryValue('cps_key', '')
  const { call: callReportCpsVisit } = useApi(reportCpsVisit)

  useEffect(() => {
    if (!cpsKey) return

    callReportCpsVisit({
      cps_key: cpsKey
    })
  }, [cpsKey, callReportCpsVisit])

  return <div></div>
}
