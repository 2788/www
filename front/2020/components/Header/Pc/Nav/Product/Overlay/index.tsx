import React, { MouseEvent } from 'react'
import { categoryNameMap, categories, categoryEnNameMap, Product, normalizeProduct, PartialProductData, categorySubCategoriesMap, subCategoryNameMap, subCategoryProductsMap, subCategoryUrlMap } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import { useModal } from 'components/Feedback'
import { useDropdown } from 'components/UI/Dropdown'
import { joinText } from 'utils/text'

import ProductOverlay from '../../ProductOverlay'
import Menu from '../../ProductOverlay/Menu'
import MenuItem from '../../ProductOverlay/Menu/Item'
import Content from '../../ProductOverlay/Content'
import ContentItem from '../../ScrollableOverlay/Content/Item'
import ContentSection from '../../ProductOverlay/Content/Section'

export default function Overlay() {
  const { startIntentConsulting } = useModal()
  const { close } = useDropdown()
  const menuItems = categories.map(category => (
    <MenuItem key={category} title={categoryNameMap[category]} subtitle={categoryEnNameMap[category]} />
  ))

  function handleConsult(intention: string) {
    // eslint-disable-next-line no-unused-expressions
    close?.()
    startIntentConsulting(intention)
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
                  {subCategoryProductsMap[subCategory].map((item, index) => (
                    <ProductContentItem
                      key={index}
                      onConsult={handleConsult}
                      product={item}
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
type ItemProps = {
  product: PartialProductData
  onConsult: (intention: string) => void
}

function ProductContentItem(props: ItemProps) {
  const productData = normalizeProduct(props.product)

  function handleClick(e: MouseEvent) {
    if (productData.url != null) return
    e.preventDefault()
    props.onConsult(joinText(productData.name, '产品'))
  }

  return (
    <ContentItem
      href={productData.url !== null ? productData.url : '#'}
      icon={<ProductIcon product={productData.product} small />}
      title={productData.name}
      subtitle={productData.url !== null ? productData.desc : '即将上线，欢迎垂询'}
      onClick={handleClick}
      hot={hotProducts.includes(productData.product)}
    />
  )
}
