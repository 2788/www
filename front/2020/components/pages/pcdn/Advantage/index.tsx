import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'
import Icon4 from './images/icon4.svg'

const advantages = [
  [
    { icon: <Icon1 />, title: '降低热点内容 50% 带宽成本', desc: '与普通 CDN 相比，使用 P2P 协议可使热点内容分发成本优化 50%，显著降低综合带宽成本' },
    { icon: <Icon2 />, title: '显著提升服务体验指标', desc: '全网卡顿率降低 25%、卡顿时长降低 50%；有网播放失败率降低 80%；全网平均下载速度提升 50%' }
  ],
  [
    { icon: <Icon3 />, title: '百万级在线设备稳定可靠', desc: '500 万潜在供给设备提升内容分发系统的可靠性，消除性能瓶颈和单点故障，服务失败率为传统 CDN 的 10%' },
    { icon: <Icon4 />, title: '多种接入方式快速集成', desc: '提供 SDK、CNAME 多种接入方式，满足多种使用场景。非侵入式对接，不改变客户现有技术体系' }
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
                <FeatureItem pos="left-right" icon={item.icon} title={item.title} key={`${index}-${i}`}>
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
