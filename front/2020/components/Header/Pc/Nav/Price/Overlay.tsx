import React from 'react'

import { subcategoriesForPrice, subCategoryNameMap, subCategoryProductsMap, priceUrlMap, nameMap, PartialProductData, Product, subCategoryUrlMapForPrice } from 'constants/products'
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
          subcategoriesForPrice.map(subCategory => (
            <ContentSection
              title={subCategoryNameMap[subCategory]}
              url={subCategoryUrlMapForPrice[subCategory]}
              key={subCategory}
            >
              {
                subCategoryProductsMap[subCategory].map((product, index) => (
                  <PrictContentSectionItem productData={product} key={index} />
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

function PrictContentSectionItem({ productData }: { productData: PartialProductData }) {
  if (!isProduct(productData)) {
    return null
  }
  const url = priceUrlMap[productData]
  if (url === null) {
    return null
  }
  return (
    <ContentSectionItem href={url}>
      {nameMap[productData]}
      {hasCalculator(productData) && <CalcIcon className={style.calc} />}
    </ContentSectionItem>
  )
}

function isProduct(data: PartialProductData): data is Product {
  return typeof data !== 'object'
}
