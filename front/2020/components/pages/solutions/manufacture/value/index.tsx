/**
 * @file 客户价值
 */
import React from 'react'
import Section from 'components/Product/Section'

import Circle from './circle.svg'
import Arrow from './arrow.svg'
import style from './index.less'

export default function Value() {
  return (
    <Section title="客户价值" name="value">
      <div className={style.wrapper}>
        <Circle />
        <Arrow style={{ margin: '0 36px 0 40px' }} />
        <ul>
          <Item badge="管理" content="全局掌控各系统运行运营状态，心中有数" />
          <Item badge="性能" content="明晰各种资源的用量与使用率，灵活调配" />
          <Item badge="安全" content="统一防范来自内外的安全风险，坚不可摧" />
          <Item badge="洞察" content="预知系统运行趋势与潜在隐患，先知先行" />
          <Item badge="响应" content="快速处理各系统的故障与告警，自动智能" />
          <Item badge="效益" content="最大程度降低故障带来的损失，价值保障" />
        </ul>
      </div>
    </Section>
  )
}

type Props = {
  badge: string
  content: string
}

function Item({ badge, content }: Props) {
  return (
    <li className={style.item}>
      <div className={style.badge}>{badge}</div>
      <span>{content}</span>
    </li>
  )
}
