import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'
import icon4 from './images/icon4.png'

const advantages = [
  [
    { icon: <FeatureIcon src={icon1} />, title: '海量带宽', desc: '单客户单点可提供高达 T 级 BGP 防护能力。轻松应对各类 DDoS 攻击，有效应对黑产、DDoS 攻击给业务带来的威胁问题，保障业务安全稳定运营。' },
    { icon: <FeatureIcon src={icon2} />, title: '领先的智能清洗能力', desc: '高可用防护集群，采用 IP 画像、行为分析、Cookie 挑战等多维算法，并通过 AI 智能引擎持续更新防护算法，精准快速检测业务流量，灵活应对各类攻击行为。' }
  ],
  [
    { icon: <FeatureIcon src={icon3} />, title: '高可用', desc: 'BGP 链路对接全国各地 30 家运营商，配合 AI 算法，全自动检测和攻击策略匹配。' },
    { icon: <FeatureIcon src={icon4} />, title: '优化成本', desc: '提供“保底防护+弹性防护”灵活计价方式，为用户降低日常安全费用，在需要时按需调整弹性防护，无需新增任何设备，进一步减少安全投入和运维成本。' }
  ]
]

export default function Advantage() {
  return (
    <Feature title="核心优势" name="advantage">
      {
        advantages.map((advantage, index) => (
          <FeatureGroup key={index}>
            {
              advantage.map((item, i) => (
                <FeatureItem pos="left-right" align="left" icon={item.icon} title={item.title} key={i}>
                  <FeatureDesc>{item.desc}</FeatureDesc>
                </FeatureItem>
              ))
            }
          </FeatureGroup>
        ))
      }
    </Feature>
  )
}
