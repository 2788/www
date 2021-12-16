import React from 'react'
import { nameMap, urlMap, Product as ProductEnum, descMap } from 'constants/products'
import Icon from '../icons/media/DataLake'
import Text from '../share/Text'
import Product from '../share/Product'

export default function DataLake() {
  return (
    <Product
      icon={<Icon />}
      textArea={
        <Text
          name="异构数据湖"
          url={urlMap[ProductEnum.Kodo]}
          tooltipTitle={nameMap[ProductEnum.Kodo]}
          tooltipDesc={descMap[ProductEnum.Kodo]}
        />
      }
    />
  )
}
