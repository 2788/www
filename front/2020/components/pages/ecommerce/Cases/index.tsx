import React from 'react'
import Section from 'components/Product/Section'
import Cases, { Case } from 'components/Solution/Cases'

import mogujie from './images/mogujie.png'
import siku from './images/siku.png'
import xiaohongshu from './images/xiaohongshu.png'

export interface Props {
  onConsult: () => void
}

export default function EcCases({ onConsult }: Props) {
  return (
    <Section name="cases" title="客户案例" withTailPadding>
      <Cases>
        <Case logo={mogujie} title="蘑菇街" onConsult={onConsult}>
          蘑菇街是女性时尚媒体和时尚消费平台，围绕“内容+社区+电商”这一核心策略，蘑菇街通过买手直播等更年轻化的业务形式，为用户带来了最潮流的产品，更时尚的消费生活体验。
        </Case>
        <Case logo={siku} title="寺库" onConsult={onConsult}>
          寺库主要业务涉及奢侈品网上销售、奢侈品实体体验会所、奢侈品鉴定、养护服务等主营业务。致力于依托数字化打造最具实力的全球领先奢侈品一站式服务平台，为追求高品质生活人士提供交流平台。
        </Case>
        <Case logo={xiaohongshu} title="小红书" onConsult={onConsult}>
          在小红书社区，用户通过文字、图片、视频笔记的分享，记录了这个时代年轻人的正能量和美好生活，背后是强大数据处理能力和视频解决方案的支撑。同时小红书通过机器学习对海量信息和人进行精准、高效匹配。
        </Case>
      </Cases>
    </Section>
  )
}
