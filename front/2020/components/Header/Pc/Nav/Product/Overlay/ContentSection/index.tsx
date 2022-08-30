/**
 * @file          component ContentSection
 * @description   ContentSection 组件，用于展示次级标题和其所配套的所有产品
 * @author        renpanpan
 */

import React, { MouseEvent } from 'react'
import { PartialProductData, normalizeProduct, Product } from 'constants/products'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import { useDropdown } from 'components/UI/Dropdown'
import Section, { ContentSectionItem, ItemProps } from '../../../Overlay/Content/Section'

type Props = {
  title: string
  url?: string
  partialProductDatas: PartialProductData[]
}

// 产品对应的热门内容
const productHotMap = {
  [Product.Qvm]: true,
  [Product.Qec]: 'NEW'
} as { [k in Product]: ItemProps['hot'] }

export default function ContentSection({ title, url, partialProductDatas }: Props) {
  return (
    <Section title={title} url={url}>
      {
        partialProductDatas.map((partialProductData, index) => (
          <ListItem key={index} partialProductData={partialProductData} />
        ))
      }
    </Section>
  )
}

function ListItem({ partialProductData }: { partialProductData: PartialProductData }) {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()
  const { close } = useDropdown()
  const productData = normalizeProduct(partialProductData)
  const hot = productHotMap[productData.product]
  const text = `${productData.name}${productData.url ? '' : ' (即将上线)'}`
  function handleClick(e: MouseEvent): void {
    if (productData.url != null) return
    e.preventDefault()
    if (close) close()
    showWechatConsultModal()
  }

  return (
    <ContentSectionItem
      href={productData.url !== null ? productData.url : '#'}
      onClick={handleClick}
      hot={hot}
    >
      {text}
    </ContentSectionItem>
  )
}
