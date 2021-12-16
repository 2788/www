import React from 'react'
import { nameMap, urlMap, Product as ProductEnum, descMap } from 'constants/products'
import Icon from '../icons/media/SDK'
import Text from '../share/Text'
import Product from '../share/Product'

export default function DataLake() {
  return (
    <Product
      icon={<Icon />}
      textArea={
        <Text
          name={nameMap[ProductEnum.Qvs]}
          url={urlMap[ProductEnum.Qvs]}
          tooltipTitle={nameMap[ProductEnum.Qvs]}
          tooltipDesc={descMap[ProductEnum.Qvs]}
        />
      }
    />
  )
}
