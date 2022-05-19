import { apiPrefix as basePrefix } from 'constants/api'
import { get as baseGet } from 'utils/fetch'

export const mongoApiPrefix = `${basePrefix}/www-admin/api/mongo`

// 单独为官网实现的关于 admin 的接口前缀
export const wwwApiPrefix = `${basePrefix}/www-admin/api/www`

export type FilterProps = {
  effectTime: number
  invalidTime: number
}

export type SortProps = {
  order: number
}

export interface ListOptions {
  limit?: number
  offset?: number
  sort?: string
  query?: Record<string | number, any>
}

export interface ListResult<T> {
  count: number
  data: T[]
}

// admin 通用响应数据处理
export function handleResponseData<T>(res: { data: T[] | null }): T[] {
  return res.data || []
}

// 过滤数据，获取上架中的数据
export function getFilteredList<T extends FilterProps>(inputList: T[]) {
  const nowTime = Math.floor(new Date().getTime() / 1000) // 取秒数
  const filteredList = inputList.filter(item => item.effectTime <= nowTime && item.invalidTime >= nowTime)
  return filteredList
}

// 排序，按照 order 进行排序
export function sortByOrder<T extends SortProps>(inputList: T[]) {
  inputList.sort((a: T, b: T) => a.order - b.order)
  return inputList
}

export function get<T>(resource: string, id: string): Promise<T> {
  return baseGet(`${mongoApiPrefix}/${resource}/${id}`)
}

export async function list<T>(
  resource: string,
  { query, ...params }: ListOptions = {}
): Promise<ListResult<T>> {
  const options = {
    ...params,
    ...(query && { query: JSON.stringify(query) })
  }
  const result = await baseGet(`${mongoApiPrefix}/${resource}`, options)
  return {
    count: result.count,
    data: handleResponseData(result)
  }
}

export async function listAll<T>(
  resource: string,
  options: Omit<ListOptions, 'offset' | 'limit'> = {}
): Promise<T[]> {
  const maxLimit = 999

  const first = await list<T>(resource, { ...options, offset: 0, limit: maxLimit })
  if (first.count <= maxLimit) { // 大概率事件
    return first.data
  }

  const len = Math.ceil(first.count / maxLimit) - 1
  const paramsList = Array.from(Array(len), (_, i) => ({ ...options, offset: (i + 1) * maxLimit, limit: maxLimit }))
  const resultList = await Promise.all(paramsList.map(params => list<T>(resource, params)))
  const allList = first.data.concat(...resultList.map(result => result.data)) // flat
  return allList
}
