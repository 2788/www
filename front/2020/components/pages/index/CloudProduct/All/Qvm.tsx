import React from 'react'
import { nameMap, urlMap, Product, descMap } from 'constants/products'
import Text from '../share/Text'

export default function Qvm() {
  return (
    <Text
      name={nameMap[Product.Qvm]}
      url={urlMap[Product.Qvm]}
      tooltipTitle={nameMap[Product.Qvm]}
      tooltipDesc={descMap[Product.Qvm]}
      centerContent
      tooltipPlacement="top"
      noBorder
      style={{ width: 1048 }}
    />
  )
}
