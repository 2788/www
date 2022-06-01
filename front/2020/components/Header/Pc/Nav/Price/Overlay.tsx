import React from 'react'

import {
  subCategoryNameMap, Product, subCategoryUrlMapForPrice, subCategoryProductDatasForPrice, ProductDataForPrice
} from 'constants/products'
import CommonOverlay from '../Overlay'
import Content from '../Overlay/Content'
import ContentSection, { ContentSectionItem } from '../Overlay/Content/Section'
import CalcIcon from './calc.svg'
import style from './style.less'

export default function Overlay() {
  return (
    <CommonOverlay>
      <Content size={4}>
        {
          subCategoryProductDatasForPrice.map(([subCategory, productDatas]) => (
            <ContentSection
              title={subCategoryNameMap[subCategory]}
              url={subCategoryUrlMapForPrice[subCategory]}
              key={subCategory}
            >
              {
                productDatas.map((productData, index) => (
                  <PrictContentSectionItem productData={productData} key={index} />
                ))
              }
            </ContentSection>
          ))
        }
      </Content>
    </CommonOverlay>
  )
}

function hasCalculator(product: Product) {
  // 目前就这四个有计算器
  return [Product.Kodo, Product.Cdn, Product.Qvm, Product.Qvs].includes(product)
}

function PrictContentSectionItem({ productData }: { productData: ProductDataForPrice }) {
  const { product, name, priceUrl } = productData
  return (
    <ContentSectionItem href={priceUrl}>
      {name}
      {hasCalculator(product) && <CalcIcon className={style.calc} />}
    </ContentSectionItem>
  )
}
