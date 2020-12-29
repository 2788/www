import { apiPrefix as basePrefix } from 'constants/api'

export const apiPrefix = `${basePrefix}/www-admin/api/mongo`

type FilterProps = {
  effectTime: number
  invalidTime: number
}

type SortProps = {
  order: number
}

// 处理响应数据，兼容老版本和新版本
export function handleResponseData(res: any) {
  if (res) { // 老版本不为空数据或者新版本
    if (typeof res.count === 'number') { // 新版本
      return res.data || []
    }
    return res
  }
  return []
}

// 过滤数据，获取上架中的数据
export function getFilteredList<T extends FilterProps>(list: T[]) {
  const nowTime = Math.floor(new Date().getTime() / 1000) // 取秒数
  const filteredList = list.filter(item => item.effectTime <= nowTime && item.invalidTime >= nowTime)
  return filteredList
}

// 排序，按照 order 进行排序
export function sortByOrder<T extends SortProps>(list: T[]) {
  list.sort((a: T, b: T) => a.order - b.order)
  return list
}
