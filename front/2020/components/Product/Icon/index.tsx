/**
 * @file 产品图标
 * @description 所有需要用到产品对应的图标的地方都用本组件，以保持一致
 */

// TODO: 还需要考虑 large icon 以及 sub category products

import React, { SVGAttributes } from 'react'
import { Product, iconMap, smallIconMap } from 'constants/products'

export type Props = SVGAttributes<SVGElement> & {
  product: Product
  small?: boolean // 是否为 24px的，默认为 32px
}

export default function ProductIcon({ product, small, ...others }: Props) {
  const Icon = small ? smallIconMap[product] : iconMap[product]
  return Icon && <Icon {...others} />
}
