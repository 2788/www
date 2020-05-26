import React, { useMemo } from 'react'
import classnames from 'classnames'
import { CSVLink } from 'react-csv'
import { useLocalStorage } from 'hooks/storage'
import { useSticky } from 'hooks/scroll'
import Card, { CardGroup, CardItem } from './Card'
import EmptyIcon from './empty.svg'

import style from './index.less'

export const STORAGE_KEY = 'shoppingcart'

export type ProductCategory = {
  name: string
  items: Array<{ text: string, unit: string }>
}

export type Product = {
  name: string
  categories: ProductCategory[]
  price: string
}

export default function ShoppingCart() {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEY)
  const total = products?.reduce((_total, product) => +product.price + _total, 0) || 0.00

  function handleDelete(index: number) {
    const newProducts = products?.slice() || []
    newProducts.splice(index, 1)

    setProducts(newProducts)
  }

  const cards = products?.slice().reverse().map((product, index) => (
    <Card key={index} title={product.name} price={product.price} index={index} onDelete={handleDelete}>
      {product.categories.map(category => (
        <CardGroup key={category.name + index} title={category.name}>
          {category.items.map(item => <CardItem key={item.text} unit={item.unit}>{item.text}</CardItem>)}
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
      <Footer products={products} total={total.toFixed(2)} />
    </div>
  )
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
    配置: product.categories.map(humanizeProductCategories)
  }))
}

// eg: 区域:华东;存储空间/月:101GB;使用时间:1个月
function humanizeProductCategories(category: ProductCategory) {
  const items = category.items.reduce((acc, item) => acc + `${item.text}:${item.unit};`, '')
  return `区域:${category.name};${items}`
}
