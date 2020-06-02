import React from 'react'
import { categoryVideo, urlMap, nameMap, descMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import Item from './Item'

export default function Video() {
  const itemsView = categoryVideo.map(product => (
    <Item
      key={product}
      href={urlMap[product]}
      icon={<ProductIcon product={product} />}
      title={nameMap[product]}
      subtitle={descMap[product]}
    />
  ))
  return <>{itemsView}</>
}
