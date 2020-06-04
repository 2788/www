import React from 'react'
import { categoryNameMap, Category, nameMap, Solution } from 'constants/solutions'

import EssIcon from './images/industry/ess.svg'
import Item from './Item'
import Section from './Section'

export default function Industry({ registerScrollTop }: { registerScrollTop(value: number): void }) {
  return (
    <Section registerScrollTop={registerScrollTop} title={categoryNameMap[Category.Industry]}>
      <Item href="/solutions/ess" icon={<EssIcon />} title={nameMap[Solution.Ess]} subtitle="满足监控视频及图片就近存储、加速传输、倍速播放等关键需求" />
    </Section>
  )
}
