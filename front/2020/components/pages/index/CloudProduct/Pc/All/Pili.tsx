import React from 'react'
import { nameMap, urlMap, Product as ProductEnum, descMap } from 'constants/products'
import Icon from '../icons/media/SDK'
import Text from '../share/Text'
import Product from '../share/Product'

export default function Pili() {
  const textAreaView = (
    <>
      <div>
        <Text
          name={nameMap[ProductEnum.Pili]}
          url={urlMap[ProductEnum.Pili]}
          tooltipTitle={nameMap[ProductEnum.Pili]}
          tooltipDesc={descMap[ProductEnum.Pili]}
          style={{ width: 140 }}
        />
        <Text
          name={nameMap[ProductEnum.Geek]}
          url={urlMap[ProductEnum.Geek]}
          tooltipTitle={nameMap[ProductEnum.Geek]}
          tooltipDesc={descMap[ProductEnum.Geek]}
          style={{ width: 140, marginLeft: 18 }}
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <Text
          name={nameMap[ProductEnum.Rtn]}
          url={urlMap[ProductEnum.Rtn]}
          tooltipTitle={nameMap[ProductEnum.Rtn]}
          tooltipDesc={descMap[ProductEnum.Rtn]}
          style={{ width: 140 }}
        />
        <Text
          name={nameMap[ProductEnum.Qvs]}
          url={urlMap[ProductEnum.Qvs]}
          tooltipTitle={nameMap[ProductEnum.Qvs]}
          tooltipDesc={descMap[ProductEnum.Qvs]}
          style={{ width: 140, marginLeft: 18 }}
        />
      </div>
    </>
  )
  return (
    <Product
      icon={<Icon />}
      textArea={textAreaView}
    />
  )
}
