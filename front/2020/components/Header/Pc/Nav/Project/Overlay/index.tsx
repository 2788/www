import React, { createElement, MouseEvent } from 'react'
import { categoryNameMap, Category, nameMap, categorySolutionsMap, urlMap, iconMap, descMap, allCategories, categoryEnNameMap, Solution } from 'constants/solutions'
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
          {categorySolutionsMap[Category.Industry].map(solution => (
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

  function handleClick(e: MouseEvent) {
    e.preventDefault()
    startConsulting()
  }

  // TODO: 对于没有落地页，点击咨询的项，怎么来表达“点击咨询”这件事情
  return (
    <ContentItem
      href={url != null ? url : '#'}
      onClick={url != null ? undefined : handleClick}
      icon={createElement(iconMap[solution])}
      title={nameMap[solution]}
      subtitle={descMap[solution]}
      extra={<Logos solution={solution} />}
    />
  )
}
