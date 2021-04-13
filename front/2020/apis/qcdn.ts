import { get } from 'utils/fetch'
import { apiPrefix as basePrefix } from 'constants/api'

const apiPrefix = `${basePrefix}/trade`

// TODO 目前无法直接获取官网所展示的套餐 id 数组，所以先在这边写死
// 后续可以考虑增加动态配置套餐的功能
export const ids = [22318, 22291, 22294, 22297]

// TODO 目前只需要原价和现价两个字段，后续需求改动可以再根据那边接口适配
export type Promotion = {
  id: number
  original_price: number // 接口返回数据精确到小数点后四位
  price: number // 接口返回数x据精确到小数点后四位
}

// TODO 目前测试环境和正式环境的id不统一，所以这边为了测试环境也可以显示，加上默认数据
// nextjs 不支持直接返回 map，所以这边使用 object 替代
const promotionMap = {
  22318: { id: 22318, original_price: 120, price: 62 },
  22291: { id: 22291, original_price: 120, price: 89 },
  22294: { id: 22294, original_price: 245.76, price: 179 },
  22297: { id: 22297, original_price: 1228.8, price: 889 }
} as { [k: number]: Promotion }

export function getPromotionMap(): Promise<{ [k: number]: Promotion }> {
  return get(`${apiPrefix}/product/ids?ids=${ids.join(',')}`, {})
    .then(res => {
      const list: Promotion[] = res.data || []
      list.forEach(item => {
        promotionMap[item.id] = item
      })
      return promotionMap
    })
}
