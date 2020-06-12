import React from 'react'
import { categoryNameMap, Category, nameMap, Solution } from 'constants/solutions'

import ScrollableOverlay from '../../ScrollableOverlay'
import Menu from '../../ScrollableOverlay/Menu'
import MenuItem from '../../ScrollableOverlay/Menu/Item'
import Content from '../../ScrollableOverlay/Content'
import ContentItem from '../../ScrollableOverlay/Content/Item'
import ContentSection from '../../ScrollableOverlay/Content/Section'

import VcsIcon from './images/scene/vcs.svg'
import KodoeIcon from './images/scene/kodoe.svg'
import PlsvIcon from './images/scene/plsv.svg'
import QavsIcon from './images/scene/qavs.svg'
import EssIcon from './images/industry/ess.svg'

export default function Overlay() {
  return (
    <ScrollableOverlay>
      <Menu defaultActive="场景解决方案">
        <MenuItem title="场景解决方案" subtitle="Solutions by Scenario" />
        <MenuItem title="行业解决方案" subtitle="Solutions by Industry" />
      </Menu>
      <Content>
        <ContentSection title={categoryNameMap[Category.Scene]}>
          <ContentItem href="/solutions/qavs" icon={<QavsIcon />} title={nameMap[Solution.Qavs]} subtitle="集视觉智能及数据智能为一体、高效、低成本的一站式视频解决方案" />
          <ContentItem href="/solutions/plsv" icon={<PlsvIcon />} title={nameMap[Solution.Plsv]} subtitle="集成完整云端能力及卓越采集端、播放端功能的一站式短视频解决方案" />
          <ContentItem href="/solutions/kodoe" icon={<KodoeIcon />} title={nameMap[Solution.Kodoe]} subtitle="为传统媒体、安防、金融等行业用户提供一站式专属解决方案，帮助企业快速实现云转型" />
          <ContentItem href="/solutions/vcs" icon={<VcsIcon />} title={nameMap[Solution.Vcs]} subtitle="专为综合视频平台打造，高可用低成本的 EB 级数据存储解决方案" />
        </ContentSection>
        <ContentSection title={categoryNameMap[Category.Industry]}>
          <ContentItem href="/solutions/ess" icon={<EssIcon />} title={nameMap[Solution.Ess]} subtitle="满足监控视频及图片就近存储、加速传输、倍速播放等关键需求" />
        </ContentSection>
      </Content>
    </ScrollableOverlay>
  )
}
