import React from 'react'
import { categoryNameMap, Category, categorySolutionsMap, urlMap, categories, categoryEnNameMap, IndustrySolution, industrySolutions } from 'constants/solutions'

import { OverlayWithMenu } from '../../Overlay'
import Menu from '../../Overlay/Menu'
import MenuItem from '../../Overlay/Menu/Item'
import Content from '../../Overlay/Menu/Content'
import ContentSection from './ContentSection'

export default function Overlay() {
  const defaultCategory = categories[0] ?? Category.VideoMarketing
  return (
    <OverlayWithMenu>
      <Menu defaultActive={categoryNameMap[defaultCategory]}>
        {categories.map(category => (
          <MenuItem key={category} title={categoryNameMap[category]} subtitle={categoryEnNameMap[category]} />
        ))}
      </Menu>
      {
        categories.map(category => {
          const solutions = category === Category.Industry
            ? industrySolutions.slice().sort(sortByOnline)
            : categorySolutionsMap[category]
          return (
            <Content key={category} name={categoryNameMap[category]} size={3} horizontal>
              {
                solutions.map(solution => (
                  <ContentSection key={solution} solution={solution} />
                ))
              }
            </Content>
          )
        })
      }
    </OverlayWithMenu>
  )
}

// 已上线的(url)的放前面
function sortByOnline(a: IndustrySolution, b: IndustrySolution) {
  if (urlMap[a] === null) {
    return 1
  }

  if (urlMap[b] === null) {
    return -1
  }

  return 0
}
