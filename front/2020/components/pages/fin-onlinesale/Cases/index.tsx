/* eslint-disable max-len */
import React from 'react'
import Section from 'components/Product/Section'
import Cases, { Case } from 'components/Solution/Cases'

import taiping from './images/taiping.png'
import style from './style.less'

export interface Props {
  onConsult: () => void
}

export default function FinCases({ onConsult }: Props) {
  return (
    <Section name="cases" title="客户案例" withTailPadding>
      <Cases>
        <Case logo={taiping} title="太平人寿保险" onConsult={onConsult}>
          <div className={style.content}>
            <p>通过金融产品在线营销解决方案，为太平保险构建完整的集团企业直播体系。总部通过战略管控，为各分支机构直播中营销传播、商品上架、客户行为数据提供战略支持。</p>
            <p>根据保险行业独有的“代理人”销售特色，设计独特的直播裂变体系。在裂变时以代理人为核心节点，将通过代理人分享链接进入直播的用户，分配至对应代理人名下，搭配“私聊”、“视频一键咨询代理人”、“客户画像分析”的功能，帮助代理人精准对接每一位潜在客户，打破以往单纯直播无法有效触达的营销困境。</p>
          </div>
        </Case>
      </Cases>
    </Section>
  )
}
