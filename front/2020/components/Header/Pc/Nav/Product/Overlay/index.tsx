import React, { MouseEvent } from 'react'
import { categoryNameMap, nameMap, categories, categoryEnNameMap, urlMap, Product, descMap, categorySubCategoriesMap, subCategoryNameMap, subCategoryProductsMap, subCategoryUrlMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import { useModal } from 'components/Feedback'
import { useDropdown } from 'components/UI/Dropdown'

import ProductOverlay from '../../ProductOverlay'
import Menu from '../../ProductOverlay/Menu'
import MenuItem from '../../ProductOverlay/Menu/Item'
import Content from '../../ProductOverlay/Content'
import ContentItem from '../../ScrollableOverlay/Content/Item'
import ContentSection from '../../ProductOverlay/Content/Section'

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

  return (
    <ProductOverlay>
      <Menu defaultActive={categoryNameMap[categories[0]]}>
        {menuItems}
      </Menu>
      {
        categories.map(category => (
          <Content key={category} name={categoryNameMap[category]}>
            {
              categorySubCategoriesMap[category].map(subCategory => (
                <ContentSection
                  key={subCategory}
                  title={subCategoryNameMap[subCategory]}
                  url={subCategoryUrlMap[subCategory]}
                >
                  {subCategoryProductsMap[subCategory].map(product => (
                    <ProductContentItem
                      key={product}
                      product={product}
                      onConsult={handleConsult}
                    />
                  ))}
                </ContentSection>
              ))
            }
          </Content>
        ))
      }
    </ProductOverlay>
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
