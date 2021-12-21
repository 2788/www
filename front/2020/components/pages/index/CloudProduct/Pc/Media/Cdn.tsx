import React from 'react'
import { nameMap, urlMap, Product as ProductEnum, descMap } from 'constants/products'
import Icon from '../icons/media/CDN'
import Text from '../share/Text'
import Product from '../share/Product'

export default function Cdn() {
  return (
    <Product
      icon={<Icon />}
      textArea={
        <Text
          name={nameMap[ProductEnum.Cdn]}
          url={urlMap[ProductEnum.Cdn]}
          tooltipTitle={nameMap[ProductEnum.Cdn]}
          tooltipDesc={descMap[ProductEnum.Cdn]}
        />
      }
    />
  )
}
