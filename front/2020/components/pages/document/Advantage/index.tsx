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
    title: '翻译保持原文排版',
    desc: '保留原文样式和排版，确保舒适流畅的阅读体验，节约调整格式的时间。'
  },
  {
    icon: <Icon2 />,
    title: '翻译精准',
    desc: '根据内容和行业等智能调整译文，呈现精准翻译结果，减少后续调整成本。'
  },
  {
    icon: <Icon3 />,
    title: '满足多种场景',
    desc: '文档转换支持将文档转换为 pdf 进行预览，或者将转换结果存储在指定七牛云存储两种方式。'
  },
  {
    icon: <Icon4 />,
    title: '接口易用',
    desc: '结合七牛云存储，经过翻译和转换后的文件可直接通过参数设置，在指定的七牛云存储中获得。'
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
