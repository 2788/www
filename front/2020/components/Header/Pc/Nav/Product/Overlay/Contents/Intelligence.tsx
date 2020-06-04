import React from 'react'
import { categoryIntelligence, urlMap, nameMap, descMap, categoryNameMap, Category } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Item from './Item'
import Section from './Section'

export default function Intelligence({ registerScrollTop }: { registerScrollTop(value: number): void }) {
  const itemsView = categoryIntelligence.map(product => (
    <Item
      key={product}
      href={urlMap[product]}
      icon={<ProductIcon product={product} />}
      title={nameMap[product]}
      subtitle={descMap[product]}
    />
  ))
  return (
    <Section registerScrollTop={registerScrollTop} title={categoryNameMap[Category.Intelligence]}>
      {itemsView}
    </Section>
  )
}
