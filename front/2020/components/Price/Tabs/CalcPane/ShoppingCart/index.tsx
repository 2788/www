import React, { useMemo, useCallback } from 'react'
import classnames from 'classnames'
import { CSVLink } from 'react-csv'
import { useLocalStorage } from 'hooks/storage'
import { useSticky } from 'hooks/scroll'
import toPrecision from 'utils/to-precision'
import Card, { CardGroup, CardItem } from './Card'
import EmptyIcon from './empty.svg'

import style from './index.less'

export const STORAGE_KEY = 'shoppingcart'

export type ProductRegion = {
  name: string
  items: Array<{ text: string, unit: string }>
}

export type Product = {
  name: string
  regions: ProductRegion[]
  price: string
}

export default function ShoppingCart() {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEY)
  const reversedProducts = products?.slice().reverse()
  const total = products?.reduce((_total, product) => +product.price + _total, 0)

  function handleDelete(index: number) {
    const newProducts = reversedProducts || []
    newProducts.splice(index, 1)

    setProducts(newProducts)
  }

  const cards = reversedProducts?.map((product, index) => (
    <Card key={index} title={product.name} price={product.price} index={index} onDelete={handleDelete}>
      {product.regions.map(region => (
        <CardGroup key={region.name + index} title={region.name}>
          {region.items.map(item => <CardItem key={item.text} unit={item.unit}>{item.text}</CardItem>)}
        </CardGroup>
      ))}
    </Card>
  ))

  return (
    <div className={style.wrapper}>
      <h3 className={style.header}>价格预算清单</h3>
      <div className={style.body}>
        {products && products.length > 0 ? cards : <Empty />}
      </div>
      <Footer products={products} total={toPrecision(total, 2)} />
    </div>
  )
}

export function useShoppingCart() {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEY)

  const addProduct = useCallback((nextProduct: Product) => {
    const stashedProducts = [...(products || [])]
    // 找是否有已经存在的产品，比如标准存储
    const matchedProduct = stashedProducts?.find(stashedProduct => stashedProduct.name === nextProduct.name)
    // 合并产品
    if (matchedProduct) {
      nextProduct.regions.forEach(nextRegion => {
        const matchedRegion = matchedProduct?.regions.find(region => region.name === nextRegion.name)
        // 合并地区
        if (matchedRegion) {
          nextRegion.items.forEach(nextItem => {
            // 合并购物车收费项
            const matchedItem = matchedRegion.items.find(item => nextItem.text === item.text)
            // 替换待合并的数量
            if (matchedItem) {
              // 用最新输入的数量替换购物车中的数量
              matchedItem.unit = nextItem.unit
            } else {
              // 新增购物车收费项
              // 这里有个隐式的依赖，使用时间是最后一位。这里要保证使用时间仍然是最后一位
              matchedRegion.items.splice(-1, 0, nextItem)
            }
          })
        } else {
          // 新增地区
          matchedProduct.regions.push(nextRegion)
        }
      })
      matchedProduct.price = nextProduct.price
    } else {
      // 新增产品
      stashedProducts.push(nextProduct)
    }
    setProducts(stashedProducts)
  }, [products, setProducts])

  return addProduct
}

function Empty() {
  return (
    <div className={style.empty}>
      <EmptyIcon className={style.emptyIcon} />
      <p className={style.emptyText}>您可以加入不同的云产品，以此</p>
      <p className={style.emptyText}>来计算它们的总价</p>
    </div>
  )
}

function Footer({ total, products }: { total: string, products: Product[] | null }) {
  const [setElm] = useSticky()

  const download = useMemo(
    () => {
      const disabled = products === null || products.length === 0

      return (
        <CSVLink
          className={classnames(style.export, disabled && style.disabled)}
          filename="shopping-list.csv"
          data={toCSV(products || [])}
          onClick={() => !disabled}
        >
          导出预算清单
        </CSVLink>
      )
    },
    [products]
  )

  return (
    <div ref={setElm} className={style.footer}>
      <p className={style.price}><span className={style.num}>{total}</span> 元</p>
      {download}
    </div>
  )
}

function toCSV(products: Product[]) {
  return products.map(product => ({
    名称: product.name,
    价格: product.price + '元',
    配置: product.regions.map(humanizeProductCategories)
  }))
}

// eg: 区域:华东;存储空间/月:101GB;使用时间:1个月
function humanizeProductCategories(region: ProductRegion) {
  const items = region.items.reduce((acc, item) => acc + `${item.text}:${item.unit};`, '')
  return `区域:${region.name};${items}`
}
