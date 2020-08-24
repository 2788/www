import React, { createElement, MouseEvent } from 'react'
import { categoryNameMap, Category, nameMap, categorySolutionsMap, urlMap, iconMap, descMap, allCategories, categoryEnNameMap, Solution, IndustrySolution } from 'constants/solutions'
import { useModal } from 'components/Feedback'

import ScrollableOverlay from '../../ScrollableOverlay'
import Menu from '../../ScrollableOverlay/Menu'
import MenuItem from '../../ScrollableOverlay/Menu/Item'
import Content from '../../ScrollableOverlay/Content'
import ContentItem from '../../ScrollableOverlay/Content/Item'
import ContentSection from '../../ScrollableOverlay/Content/Section'

import Logos from './Logos'

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
            <SolutionItem key={solution} solution={solution} />
          ))}
        </ContentSection>
        <ContentSection title={categoryNameMap[Category.Industry]}>
          {categorySolutionsMap[Category.Industry].slice().sort(sortByOnline).map(solution => (
            <SolutionItem key={solution} solution={solution} />
          ))}
        </ContentSection>
      </Content>
    </ScrollableOverlay>
  )
}

function SolutionItem({ solution }: { solution: Solution }) {

  const { startConsulting } = useModal()

  const url = urlMap[solution]
  const online = url != null // 方案内容已上线

  function handleClick(e: MouseEvent) {
    e.preventDefault()
    startConsulting()
  }

  return (
    <ContentItem
      href={url != null ? url : '#'}
      onClick={online ? undefined : handleClick}
      icon={createElement(iconMap[solution])}
      title={nameMap[solution]}
      subtitle={online ? descMap[solution] : '即将上线，敬请垂询'}
      extra={<Logos solution={solution} />}
    />
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
