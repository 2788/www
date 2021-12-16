import React from 'react'
import { nameMap, urlMap, Product as ProductEnum, descMap } from 'constants/products'
import Icon from '../icons/machine/MachineDataProcessPlat'
import Text from '../share/Text'
import Product from '../share/Product'

export default function MachineDataProcessPlat() {
  return (
    <Product
      icon={<Icon />}
      textArea={
        <Text
          // TODO 看是否能直接把 nameMap 里的名字改成这个
          name="机器数据处理平台"
          url={urlMap[ProductEnum.Express]}
          tooltipTitle={nameMap[ProductEnum.Express]}
          tooltipDesc={descMap[ProductEnum.Express]}
        />
      }
    />
  )
}
