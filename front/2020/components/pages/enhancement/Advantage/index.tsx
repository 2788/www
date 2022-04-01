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
  {
    icon: <Icon1 />,
    title: '能力出色',
    desc: '画质体验和超分性能出色，极大节省 GPU 资源，实现服务端最高 1080P 实时画质增强处理。'
  },
  {
    icon: <Icon2 />,
    title: '高可定制',
    desc: '可根据客户实际业务场景进行模型训练和优化，提升画质，满足各类业务场景需求。'
  },
  {
    icon: <Icon3 />,
    title: '灵活接入',
    desc: '支持开放 API 直接调用和私有化部署两种方式。'
  },
  {
    icon: <Icon4 />,
    title: '持续升级',
    desc: '算法和模型会根据实际业务需求持续迭代升级，不断提升画质体验。'
  }
]

export default function Advantage() {
  return (
    <Feature title="核心优势" name="advantages">
      <FeatureGroup>
        {
          advantages.map((advantage, index) => (
            <FeatureItem pos="top-down" align="left" icon={advantage.icon} title={advantage.title} key={index}>
              <FeatureDesc>{advantage.desc}</FeatureDesc>
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}