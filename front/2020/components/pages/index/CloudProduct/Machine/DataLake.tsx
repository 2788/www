import React from 'react'
import { nameMap, urlMap, Product as ProductEnum, descMap } from 'constants/products'
import Positioned from '../share/Positioned'
import { Node } from '..'
import Icon from '../icons/media/DataLake'
import Text from '../share/Text'
import Product from '../share/Product'

export default function DataLake() {
  return (
    <>
      <Positioned identity={Node.Kodo} top={468} left={412 + 64} zIndex={1}>
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
      </Positioned>
      <Background />
    </>
  )
}

function Background() {
  return (
    <Positioned top={462} left={119 + 64}>
      <svg width="686" height="160" viewBox="0 0 686 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="685" height="159" rx="3.5" stroke="#07BEFF" strokeDasharray="4 4" />
      </svg>
    </Positioned>
  )
}
