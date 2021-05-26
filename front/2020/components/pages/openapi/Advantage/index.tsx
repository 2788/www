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
  { icon: <Icon1 />, title: '一站式服务', desc: '与现有的数据处理应用无缝衔接，为您提供一站式服务' },
  { icon: <Icon2 />, title: '丰富优选', desc: '丰富多样的服务，满足多种场景和多样化需求' },
  { icon: <Icon3 />, title: '支持高并发', desc: '服务高质量，可靠稳定，支持高并发' }
]

export default function Advantage() {
  return (
    <Feature title="产品优势" name="advantage">
      <FeatureGroup>
        {
          advantages.map((item, i) => (
            <FeatureItem pos="top-down" align="left" icon={item.icon} title={item.title} key={i}>
              <FeatureDesc>{item.desc}</FeatureDesc>
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}
