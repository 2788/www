/**
 * @file cps 相关 hooks
 * @author jiayizhen <jiayizhen@qiniu.com>
 */

import { useEffect } from 'react'

import { useQueryValue } from 'hooks/url'
import { useApi } from 'hooks/api'

import { reportCpsVisit } from 'apis/cps'

export function useReportCpsVisit() {
  // 如果 url 有 cps_key query 参数
  // 则调用后端接口种下对应的 cookie
  // https://jira.qiniu.io/browse/BO-15948
  // TODO: 后续将对应逻辑迁移到 externals 中
  // https://jira.qiniu.io/browse/BO-16041
  const [cpsKey] = useQueryValue('cps_key', '')
  const { call: callReportCpsVisit } = useApi(reportCpsVisit)

  useEffect(() => {
    if (!cpsKey) return

    callReportCpsVisit({
      cps_key: cpsKey
    })
  }, [cpsKey, callReportCpsVisit])
}
