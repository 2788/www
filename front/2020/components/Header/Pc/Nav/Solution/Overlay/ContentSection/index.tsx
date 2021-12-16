/**
 * @file          component Section
 * @description   Solution Content Section 组件，用于展示方案数据
 * @author        renpanpan
 */

import React, { MouseEvent } from 'react'
import { nameMap, urlMap, descMap, Solution } from 'constants/solutions'
import { useModal } from 'components/Feedback'
import { useDropdown } from 'components/UI/Dropdown'
import { joinText } from 'utils/text'
import { ContentSectionItem } from '../../../Overlay/Content/Section'

import Logos from '../Logos'
import style from './style.less'

// 需要加热门的方案
const hotSolutions: Solution[] = []

export default function ContentSection({ solution }: { solution: Solution }) {
  const { startIntentConsulting } = useModal()
  const { close } = useDropdown()
  const url = urlMap[solution]
  const online = url != null // 方案内容已上线
  const subtitle = online ? descMap[solution] : '即将上线，敬请垂询'
  const hot = hotSolutions.includes(solution)

  function handleClick(e: MouseEvent) {
    if (online) return
    e.preventDefault()
    if (close) close()
    startIntentConsulting(joinText(nameMap[solution], '解决方案'))
  }

  return (
    <section className={style.contentSection}>
      <ContentSectionItem
        href={url != null ? url : '#'}
        onClick={handleClick}
        title={nameMap[solution]}
        hot={hot}
        className={style.item}
      >
        <div className={style.subtitle}>{subtitle}</div>
        <Logos solution={solution} />
      </ContentSectionItem>
    </section>
  )
}
