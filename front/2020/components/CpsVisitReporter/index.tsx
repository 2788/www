/**
 * @file 上报 cps 访问信息组件
 */

import { useReportCpsVisit } from 'hooks/cps'

export default function CpsVisitReporter() {
  useReportCpsVisit()

  return null
}
