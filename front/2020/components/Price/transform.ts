import { Product, ProductCategory } from './Banner/CalcPane/ShoppingCart'
import { CalcInput } from './Calculator'

// 把 CalcInput 转换成购物车需要的产品信息
export default function transform(name: string, price: string, source: CalcInput[]): Product {
  const categories: ProductCategory[] = source.map(_source => ({
    name: _source.desc,
    items: _source.items.map(item => ({ text: item.name, unit: item.count + item.unit }))
  }))

  return {
    name,
    price,
    categories
  }
}
