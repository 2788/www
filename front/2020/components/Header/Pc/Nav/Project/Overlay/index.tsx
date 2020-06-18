import React, { createElement } from 'react'
import { categoryNameMap, Category, nameMap, categorySolutionsMap, urlMap, iconMap, descMap, allCategories, categoryEnNameMap } from 'constants/solutions'

import ScrollableOverlay from '../../ScrollableOverlay'
import Menu from '../../ScrollableOverlay/Menu'
import MenuItem from '../../ScrollableOverlay/Menu/Item'
import Content from '../../ScrollableOverlay/Content'
import ContentItem from '../../ScrollableOverlay/Content/Item'
import ContentSection from '../../ScrollableOverlay/Content/Section'

export default function Overlay() {
  return (
    <ScrollableOverlay>
      <Menu defaultActive={categoryNameMap[Category.Scene]}>
        {allCategories.map(category => (
          <MenuItem key={category} title={categoryNameMap[category]} subtitle={categoryEnNameMap[category]} />
        ))}
      </Menu>
      <Content>
        <ContentSection title={categoryNameMap[Category.Scene]}>
          {categorySolutionsMap[Category.Scene].map(solution => (
            <ContentItem
              key={solution}
              href={urlMap[solution]}
              icon={createElement(iconMap[solution])}
              title={nameMap[solution]}
              subtitle={descMap[solution]}
            />
          ))}
        </ContentSection>
        <ContentSection title={categoryNameMap[Category.Industry]}>
          {categorySolutionsMap[Category.Industry].map(solution => (
            <ContentItem
              key={solution}
              href={urlMap[solution]}
              icon={createElement(iconMap[solution])}
              title={nameMap[solution]}
              subtitle={descMap[solution]}
            />
          ))}
        </ContentSection>
      </Content>
    </ScrollableOverlay>
  )
}
