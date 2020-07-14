/**
 * @file 云主机相关常量定义
 */

// 可购买的时长选项
export const availableDurations = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, // 1-9 个月
  12, 12 * 2, 12 * 3, 12 * 5 // 1, 2, 3, 5 年
]

export function isYear(duration: number) {
  return duration % 12 === 0
}

export function humanizeDuration(duration: number) {
  return (
    isYear(duration)
    ? `${duration / 12} 年`
    : `${duration} 个月`
  )
}

/** 地区优先级列表，控制地区选项的排序 */
export const regionPriorityMap: { [id: string]: number } = {
  'cn-zhangjiakou': 2, // 优先华北 3
  'cn-qingdao': 1 // 其次华北 1
}

/** 依据优先级对 region id 列表进行排序，优先级高的在前面 */
export function regionIdSorter(idA: string, idB: string) {
  const priorityA = regionPriorityMap[idA] || 0
  const priorityB = regionPriorityMap[idB] || 0
  return priorityB - priorityA
}

export const avaliableRegions = [
  { id: 'cn-qingdao', name: '华北 1' },
  { id: 'cn-beijing', name: '华北 2' },
  { id: 'cn-zhangjiakou', name: '华北 3' },
  { id: 'cn-huhehaote', name: '华北 5' },
  { id: 'cn-hangzhou', name: '华东 1' },
  { id: 'cn-shanghai', name: '华东 2' },
  { id: 'cn-shenzhen', name: '华南 1' },
  { id: 'cn-hongkong', name: '香港' },
  { id: 'ap-southeast-1', name: '亚太东南 1 (新加坡)' },
  { id: 'ap-southeast-3', name: '亚太东南 3 (吉隆坡)' },
  { id: 'us-east-1', name: '美国东部 1 (弗吉尼亚)' },
  { id: 'us-west-1', name: '美国西部 1 (硅谷)' },
  { id: 'eu-central-1', name: '欧洲中部 1 (法兰克福)' },
  { id: 'ap-southeast-2', name: '亚太东南 2 (悉尼)' },
  { id: 'ap-south-1', name: '亚太南部 1 (孟买)' },
  { id: 'ap-southeast-5', name: '亚太东南 5 (雅加达)' },
  { id: 'ap-northeast-1', name: '亚太东北 1 (东京)' },
  { id: 'me-east-1', name: '中东东部 1 (迪拜)' }
]
