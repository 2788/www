import React from 'react'
import { nameMap, urlMap, Product as ProductEnum, descMap } from 'constants/products'
import { nameMap as landpageNameMap, urlMap as landpageUrlMap, descMap as landpageDescMap, Landpage } from 'constants/landpage'
import Icon from '../icons/media/SDK'
import Text from '../share/Text'
import Product from '../share/Product'

export default function DataLake() {
  const textAreaView = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text
        name={nameMap[ProductEnum.Pili]}
        url={urlMap[ProductEnum.Pili]}
        tooltipTitle={nameMap[ProductEnum.Pili]}
        tooltipDesc={descMap[ProductEnum.Pili]}
      />
      <Text
        name={nameMap[ProductEnum.Rtn]}
        url={urlMap[ProductEnum.Rtn]}
        tooltipTitle={nameMap[ProductEnum.Rtn]}
        tooltipDesc={descMap[ProductEnum.Rtn]}
        style={{ marginTop: 8 }}
      />
      <Text
        name={landpageNameMap[Landpage.Sdk]}
        url={landpageUrlMap[Landpage.Sdk]}
        tooltipTitle={landpageNameMap[Landpage.Sdk]}
        tooltipDesc={landpageDescMap[Landpage.Sdk]}
        style={{ marginTop: 8 }}
      />
    </div>
  )
  return (
    <Product
      icon={<Icon />}
      textArea={textAreaView}
    />
  )
}
