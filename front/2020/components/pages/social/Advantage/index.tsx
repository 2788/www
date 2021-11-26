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

const groups = [
  [
    { icon: <Icon1 />, title: '一站式解决方案', desc: '集图片处理、音视频点播、直播与互动、音视频处理、存储与分发等服务的一站式社交解决方案。' },
    { icon: <Icon2 />, title: '高品质音视频服务能力', desc: '支持高清实时音视频服务，在互动实时性、音频 3A 处理，抗弱网能力等方面表现优异。' },
    { icon: <Icon3 />, title: '高可靠全球实时流网络', desc: '支持全球范围的实时流网络覆盖，为全球各区域用户提供高质量音视频直播服务。' }
  ],
  [
    { icon: <Icon4 />, title: '实时内容审核服务', desc: '精准识别社交各类场景中的违规内容，帮助平台防范内容违规风险，提升用户体验。' },
    { icon: <Icon5 />, title: '全链路质量监控', desc: '支持网络品质监控与自动调度系统，实时优化传输质量。' },
    { icon: <Icon6 />, title: '智能调度策略', desc: '实时计算全链路状态，智能分配流媒体服务器和加速线路。' }
  ]
]

export default function Advantage() {
  return (
    <Feature title="方案优势" name="advantage">
      {
        groups.map((group, index) => (
          <FeatureGroup key={index}>
            {
              group.map((item, i) => (
                <FeatureItem pos="top-down" align="left" icon={item.icon} title={item.title} key={`${index}-${i}`}>
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