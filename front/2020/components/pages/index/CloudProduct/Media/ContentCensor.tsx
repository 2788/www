import React from 'react'
import { nameMap, urlMap, descMap, Product as ProductEnum } from 'constants/products'
import Icon from '../icons/machine/ContentCensor'
import Text from '../share/Text'
import Product from '../share/Product'

export default function ContentCensor() {
  return (
    <Product
      icon={<Icon />}
      textArea={
        <Text
          name={nameMap[ProductEnum.Censor]}
          url={urlMap[ProductEnum.Censor]}
          tooltipTitle={nameMap[ProductEnum.Censor]}
          tooltipDesc={descMap[ProductEnum.Censor]}
        />
      }
    />
  )
}
