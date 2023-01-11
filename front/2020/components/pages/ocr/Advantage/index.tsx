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
    { icon: <FeatureIcon src={icon1} />, title: '准确率高', desc: '利用海量的图片样本训练模型，具有业内领先的准确率' },
    { icon: <FeatureIcon src={icon2} />, title: '服务稳定', desc: '提供弹性服务，扩展性好，算法持续迭代优化' }
  ],
  [
    { icon: <FeatureIcon src={icon3} />, title: '识别速度快', desc: '单张图片毫秒级返回' },
    { icon: <FeatureIcon src={icon4} />, title: '接入方便', desc: '服务使用简单快捷，兼容性强，并提供全流程技术支持' }
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
