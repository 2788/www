import React from 'react'
import { categoryService, urlMap, nameMap, descMap, categoryNameMap, Category } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Item from './Item'
import Section from './Section'

export default function Service({ registerScrollTop }: { registerScrollTop(value: number): void }) {
  const itemsView = categoryService.map(product => (
    <Item
      key={product}
      href={urlMap[product]}
      icon={<ProductIcon product={product} />}
      title={nameMap[product]}
      subtitle={descMap[product]}
    />
  ))

  return <Section registerScrollTop={registerScrollTop} title={categoryNameMap[Category.Service]}>{itemsView}</Section>
}
