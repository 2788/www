import React, { useRef, useEffect } from 'react'
import { useLocalStorage } from 'hooks/storage'
import { useSticky } from 'hooks/scroll'
import Button from 'components/UI/Button'
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

  // TODO reverse key 有问题
  const cards = products?.map((product, index) => (
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
      <Footer total={total.toFixed(2)} />
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

function Footer({ total }: { total: string }) {
  const [setElm] = useSticky()

  return (
    <div ref={setElm} className={style.footer}>
      <p className={style.price}><span className={style.num}>{total}</span> 元</p>
      <Button withBorder className={style.export}>导出预算清单</Button>
    </div>
  )
}
