import React from 'react'
import { categoryNameMap, Category, nameMap, categories, categoryEnNameMap, categoryStorage, urlMap, Product, descMap, categoryService, categoryVideo, categoryIntelligence } from 'constants/products'
import ProductIcon from 'components/Product/Icon'
import { useModal } from 'components/Feedback'
import { useDropdown } from 'components/UI/Dropdown'

import ScrollableOverlay from '../../ScrollableOverlay'
import Menu from '../../ScrollableOverlay/Menu'
import MenuItem from '../../ScrollableOverlay/Menu/Item'
import Content from '../../ScrollableOverlay/Content'
import ContentItem from '../../ScrollableOverlay/Content/Item'
import ContentSection from '../../ScrollableOverlay/Content/Section'

const hotMap = {
  [Product.Kodo]: true,
  [Product.Archive]: false
}

export default function Overlay() {
  const { startConsulting } = useModal()
  const { close } = useDropdown()
  const menuItems = categories.map(category => (
    <MenuItem key={category} title={categoryNameMap[category]} subtitle={categoryEnNameMap[category]} />
  ))

  function handleHDFSClick() {
    // eslint-disable-next-line no-unused-expressions
    close?.()
    startConsulting()
  }

  return (
    <ScrollableOverlay>
      <Menu defaultActive={categoryNameMap[Category.Storage]}>
        {menuItems}
      </Menu>
      <Content>
        <ContentSection title={categoryNameMap[Category.Storage]}>
          {categoryStorage.map(product => (
            <ContentItem
              key={product}
              href={urlMap[product]}
              icon={<ProductIcon product={product} />}
              hot={hotMap[product]}
              title={nameMap[product]}
              subtitle={descMap[product]}
            />
          ))}
          <ContentItem
            onClick={handleHDFSClick}
            href="#"
            icon={<ProductIcon product={Product.Hdfs} />}
            title={nameMap[Product.Hdfs]}
            subtitle="即将上线，欢迎垂询"
          />
        </ContentSection>
        <ContentSection title={categoryNameMap[Category.Service]}>
          {
            categoryService.map(product => (
              <ContentItem
                key={product}
                href={urlMap[product]}
                icon={<ProductIcon product={product} />}
                title={nameMap[product]}
                subtitle={descMap[product]}
              />
            ))
          }
        </ContentSection>
        <ContentSection title={categoryNameMap[Category.Video]}>
          {
            categoryVideo.map(product => (
              <ContentItem
                key={product}
                href={urlMap[product]}
                icon={<ProductIcon product={product} />}
                title={nameMap[product]}
                subtitle={descMap[product]}
              />
            ))
          }
        </ContentSection>
        <ContentSection title={categoryNameMap[Category.Intelligence]}>
          {
            categoryIntelligence.map(product => (
              <ContentItem
                key={product}
                href={urlMap[product]}
                icon={<ProductIcon product={product} />}
                title={nameMap[product]}
                subtitle={descMap[product]}
              />
            ))
          }
        </ContentSection>
      </Content>
    </ScrollableOverlay>
  )
}
