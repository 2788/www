import { get } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'

const apiPrefix = `${basePrefix}/cps`

export async function getCpsInfo(): Promise<boolean> {
  return get(`${apiPrefix}/user/`).then(
    () => true,
    () => false
  )
}
