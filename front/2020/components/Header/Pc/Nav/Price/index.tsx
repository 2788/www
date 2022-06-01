import React from 'react'
import { subCategoryProductDatasForPrice } from 'constants/products'
import Overlay from './Overlay'
import { ItemWithOverlay } from '..'

export default function Price() {
  if (subCategoryProductDatasForPrice.length === 0) {
    return null
  }

  return (
    <ItemWithOverlay overlay={<Overlay />}>定价</ItemWithOverlay>
  )
}
