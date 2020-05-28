import React from 'react'
import { Product, categoryIntelligence, urlMap, nameMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Item from './Item'

const subtitleMap = {
  [Product.Insight]: '海量异构数据采集，秒级实时日志检索，高效智能业务洞察',
  [Product.Express]: '助力企业探索数据、创造价值、预见未来'
}

export default function Intelligence() {
  const itemsView = categoryIntelligence.map(product => (
    <Item
      key={product}
      href={urlMap[product]}
      icon={<ProductIcon product={product} />}
      title={nameMap[product]}
      subtitle={subtitleMap[product]}
    />
  ))
  return <>{itemsView}</>
}
