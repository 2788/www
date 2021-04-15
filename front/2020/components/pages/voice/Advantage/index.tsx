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
  { icon: <Icon1 />, title: '识别准确', desc: '在 AI SHELL 公开数据集上，字错率 < 1%' },
  { icon: <Icon2 />, title: '处理迅速', desc: '毫秒级别延时，可支持实时语音识别' },
  { icon: <Icon3 />, title: '灵活配置', desc: '语音识别支持普通话和常用英文单词，语音合成支持多语种、多音色、支持配置语速、音量、音高等' },
  { icon: <Icon4 />, title: '性能优越', desc: '高达 99.9% 可用性' }
]

export default function Advantage() {
  return (
    <Feature title="核心优势" name="advantage">
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
