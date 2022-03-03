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
import Icon5 from './images/icon5.svg'
import Icon6 from './images/icon6.svg'

const advantages = [
  [
    { icon: <Icon1 />, title: '一站式方案', desc: '七牛云提供完备的产品组合，包括连麦 SDK、实时音视频云、直播云、视频转码、存储、CDN 分发，支持美颜美妆特效 SDK 深度融合。同时与主流 IM 供应商建立了良好的商务互信，共同助力客户完成场景业务搭建。' },
    { icon: <Icon2 />, title: '双模式可用', desc: '支持单路转推及合流转推的旁路直播模式，以便直播间内尤其是连麦 PK 场景中单主播与多主播情形的平滑切换。可支持 RTC 万人大房间，同时支持使用 CDN 直播覆盖更多观众。' },
    { icon: <Icon3 />, title: '快速接入', desc: '提供互动直播商用级 Demo，不仅 UI 开源，而且可快速了解互动直播场景的开发流程和 API 调用逻辑，实现快速接入及上线。' }
  ],
  [
    { icon: <Icon4 />, title: '美颜美妆', desc: '七牛云提供的视频特效产品组合，是与知名美颜美妆技术供应商的深度融合方案，与分别单独接入连麦 SDK 及美颜 SDK 相比，接入效率提高一倍' },
    { icon: <Icon5 />, title: '高性能网络', desc: '互动直播使用的音视频传输网络，其核心调度算法脱胎自七牛直播业务，历时六年、上万个直播客户、数亿场直播的考验。支持就近接入、智能路由，实时调度，负载均衡，轻松应对高并发业务场景。' },
    { icon: <Icon6 />, title: '全链路监控', desc: '基于七牛自研机器数据分析平台，打造了音视频通信的全链路质量监控服务，用于问题排查，辅助提升通信质量，优化网络性能，保障每一场直播的稳定流畅。' }
  ]
]

export default function Advantage() {
  return (
    <Feature title="方案优势" name="advantage">
      {
        advantages.map((advantage, index) => (
          <FeatureGroup key={index}>
            {
              advantage.map((item, i) => (
                <FeatureItem pos="top-down" align="justify" icon={item.icon} title={item.title} key={`${index}-${i}`}>
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
