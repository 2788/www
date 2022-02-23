import { Product, ProductRegion } from './Tabs/CalcPane/ShoppingCart'
import { CalcInput } from './Calculator'

// 把 CalcInput 转换成购物车需要的产品信息
export default function transform(name: string, price: string, source: CalcInput[], duration?: number): Product {
  const regions: ProductRegion[] = source
    // 过滤 item 全部为 0 的地区
    .filter(_source => _source.items.find(item => item.count > 0))
    .map(_source => ({
      name: _source.desc,
      items: _source.items
        // 过滤 count 为 0 的 item
        .filter(item => item.count > 0)
        .map(item => ({ text: item.desc, unit: item.count + item.unit }))
        .concat({ text: '使用时间', unit: duration + '个月' })
    }))

  return {
    name,
    price,
    regions
  }
}
