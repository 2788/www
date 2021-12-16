import React from 'react'
import { categoryNameMap, categories, categoryEnNameMap, categorySubCategoriesMap, subCategoryNameMap, subCategoryProductsMap, subCategoryUrlMap } from 'constants/products'

import { OverlayWithMenu } from '../../Overlay'
import Menu from '../../Overlay/Menu'
import MenuItem from '../../Overlay/Menu/Item'
import Content from '../../Overlay/Menu/Content'
import ContentSection from './ContentSection'
import style from './style.less'

export default function Overlay() {
  const menuItems = categories.map(category => (
    <MenuItem key={category} title={categoryNameMap[category]} subtitle={categoryEnNameMap[category]} />
  ))

  return (
    <OverlayWithMenu>
      <Menu defaultActive={categoryNameMap[categories[0]]}>
        {menuItems}
      </Menu>
      {
        categories.map(category => (
          <Content key={category} name={categoryNameMap[category]} size={4} className={style.content}>
            {
              categorySubCategoriesMap[category].map(subCategory => (
                <ContentSection
                  key={subCategory}
                  title={subCategoryNameMap[subCategory]}
                  url={subCategoryUrlMap[subCategory]}
                  partialProductDatas={subCategoryProductsMap[subCategory]}
                />
              ))
            }
          </Content>
        ))
      }
    </OverlayWithMenu>
  )
}
