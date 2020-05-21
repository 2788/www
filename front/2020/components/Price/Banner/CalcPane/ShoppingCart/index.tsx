import React from 'react'
import { useLocalStorage } from 'hooks/storage'

import Card, { CardGroup, CardItem } from './Card'

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
  const [products] = useLocalStorage<Product[]>(STORAGE_KEY)

  const cards = products?.map(product => (
    <Card key={product.name} title={product.name} price={product.price}>
      {product.categories.map(category => (
        <CardGroup key={category.name} title={category.name}>
          {category.items.map(item => <CardItem key={item.text} unit={item.unit}>{item.text}</CardItem>)}
        </CardGroup>
      ))}
    </Card>
  ))

  return (
    <div className={style.wrapper}>
      <h3 className={style.header}>价格预算清单</h3>
      <div className={style.body}>
        {cards}
      </div>
    </div>
  )
}
