import { get, post } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'

const apiPrefix = `${basePrefix}/cps`

export async function getCpsInfo(): Promise<boolean> {
  return get(`${apiPrefix}/user/`).then(
    () => true,
    () => false
  )
}

export type ReportCpsVisitOptions = {
  cps_key: string
}

export function reportCpsVisit(options: ReportCpsVisitOptions): Promise<void> {
  return post(`${apiPrefix}/promotions/visit/report`, options)
}
