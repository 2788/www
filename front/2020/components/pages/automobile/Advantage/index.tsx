import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'
import Icon3 from './images/icon3.svg'

const advantages = [
  {
    icon: <Icon1 />,
    title: '在线实时化监控',
    desc: '基于七牛云 LiveNet 实时网络技术，七牛云视频监控 QVS 在云端收流后，跨地域跨运营商分发加速，秒级首开的极速视频体验。'
  },
  {
    icon: <Icon2 />,
    title: '紧急视频云上持久存储',
    desc: '告警关联视频上传七牛云对象存储 Kodo，结合断点续传以及异地容灾能力，关键视频云上永久存储，可靠性可达 11 个 9。'
  },
  {
    icon: <Icon3 />,
    title: '业务及 IT 健康度监控',
    desc: '通过机器学习自动实现跨系统的业务路径拓扑图，依据业务间的请求耗时、成功率等关键业务指标，提前发现业务异常及健康度分析。'
  }
]

export default function Advantage() {
  return (
    <Feature title="方案优势" name="advantage">
      <FeatureGroup>
        {
          advantages.map((item, index) => (
            <FeatureItem pos="top-down" align="left" icon={item.icon} title={item.title} key={index}>
              <FeatureDesc>{item.desc}</FeatureDesc>
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}
