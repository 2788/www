import React, { createElement } from 'react'
import { categoryNameMap, Category, nameMap, Solution, category, urlMap, iconMap, descMap } from 'constants/solutions'

import ScrollableOverlay from '../../ScrollableOverlay'
import Menu from '../../ScrollableOverlay/Menu'
import MenuItem from '../../ScrollableOverlay/Menu/Item'
import Content from '../../ScrollableOverlay/Content'
import ContentItem from '../../ScrollableOverlay/Content/Item'
import ContentSection from '../../ScrollableOverlay/Content/Section'

export default function Overlay() {
  return (
    <ScrollableOverlay>
      <Menu defaultActive="场景解决方案">
        <MenuItem title="场景解决方案" subtitle="Solutions by Scenario" />
        <MenuItem title="行业解决方案" subtitle="Solutions by Industry" />
      </Menu>
      <Content>
        <ContentSection title={categoryNameMap[Category.Scene]}>
          {category[Category.Scene].map(solution => (
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
          {category[Category.Industry].map(solution => (
            <ContentItem
              key={solution}
              href={urlMap[solution]}
              icon={createElement(iconMap[solution])}
              title={nameMap[Solution.Qavs]}
              subtitle={descMap[solution]}
            />
          ))}
        </ContentSection>
      </Content>
    </ScrollableOverlay>
  )
}
