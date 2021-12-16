import React from 'react'
import { nameMap, urlMap, descMap, Product as ProductEnum } from 'constants/products'
import Icon from '../icons/machine/AIMarket'
import Text from '../share/Text'
import Product from '../share/Product'

export default function AIMarket() {
  return (
    <Product
      icon={<Icon />}
      textArea={
        <Text
          name={nameMap[ProductEnum.OpenAPI]}
          url={urlMap[ProductEnum.OpenAPI]}
          tooltipTitle={nameMap[ProductEnum.OpenAPI]}
          tooltipDesc={descMap[ProductEnum.OpenAPI]}
        />
      }
    />
  )
}
