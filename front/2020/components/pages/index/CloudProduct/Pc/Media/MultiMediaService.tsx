import React from 'react'
import { nameMap, urlMap, descMap, Product as ProductEnum } from 'constants/products'
import Icon from '../icons/machine/MultipleMediaService'
import Text from '../share/Text'
import Product from '../share/Product'

export default function MultiMediaService() {
  return (
    <Product
      icon={<Icon />}
      textArea={
        <Text
          name={nameMap[ProductEnum.Dora]}
          url={urlMap[ProductEnum.Dora]}
          tooltipTitle={nameMap[ProductEnum.Dora]}
          tooltipDesc={descMap[ProductEnum.Dora]}
        />
      }
    />
  )
}
