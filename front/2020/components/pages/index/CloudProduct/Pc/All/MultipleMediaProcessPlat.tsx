import React from 'react'
import { urlMap, Product as ProductEnum, descMap } from 'constants/products'
import Icon from '../icons/machine/MultipleMediaProcessPlat'
import Text from '../share/Text'
import Product from '../share/Product'

export default function MultipleMediaProcessPlat() {
  return (
    <Product
      icon={<Icon />}
      textArea={
        <Text
          // TODO 看是否能直接替换 nameMap 里的名字
          name="多媒体数据处理平台"
          url={urlMap[ProductEnum.Dora]}
          tooltipTitle="多媒体数据处理平台"
          tooltipDesc={descMap[ProductEnum.Dora]}
        />
      }
    />
  )
}
