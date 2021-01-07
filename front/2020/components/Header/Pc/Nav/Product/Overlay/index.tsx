import React, { MouseEvent } from 'react'
import { categoryNameMap, nameMap, categories, categoryEnNameMap, urlMap, Product, descMap, categoryProductsMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import { useModal } from 'components/Feedback'
import { useDropdown } from 'components/UI/Dropdown'

import ScrollableOverlay from '../../ScrollableOverlay'
import Menu from '../../ScrollableOverlay/Menu'
import MenuItem from '../../ScrollableOverlay/Menu/Item'
import Content from '../../ScrollableOverlay/Content'
import ContentItem from '../../ScrollableOverlay/Content/Item'
import ContentSection from '../../ScrollableOverlay/Content/Section'

export default function Overlay() {
  const { startConsulting } = useModal()
  const { close } = useDropdown()
  const menuItems = categories.map(category => (
    <MenuItem key={category} title={categoryNameMap[category]} subtitle={categoryEnNameMap[category]} />
  ))

  function handleConsult() {
    // eslint-disable-next-line no-unused-expressions
    close?.()
    startConsulting()
  }

  const contentSections = categories.map(category => (
    <ContentSection key={category} title={categoryNameMap[category]}>
      {categoryProductsMap[category].map(product => (
        <ProductContentItem
          key={product}
          product={product}
          onConsult={handleConsult}
        />
      ))}
    </ContentSection>
  ))

  return (
    <ScrollableOverlay>
      <Menu defaultActive={categoryNameMap[categories[0]]}>
        {menuItems}
      </Menu>
      <Content>
        {contentSections}
      </Content>
    </ScrollableOverlay>
  )
}

// 需要加热门的产品目录
const hotProducts = [
  Product.Qvm
]
function ProductContentItem({ product, onConsult }: {
  product: Product
  onConsult(): void
}) {
  const url = urlMap[product]
  const isHot = hotProducts.includes(product)

  function handleClick(e: MouseEvent) {
    if (url != null) return
    e.preventDefault()
    onConsult()
  }

  return (
    <ContentItem
      key={product}
      href={url != null ? url : '#'}
      icon={<ProductIcon product={product} small />}
      title={nameMap[product]}
      subtitle={url != null ? descMap[product] : '即将上线，欢迎垂询'}
      onClick={handleClick}
      hot={isHot}
    />
  )
}
