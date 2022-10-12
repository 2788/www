import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureItemIcon
} from 'components/Product/Feature'

import icon1 from './images/icon1.png'
import icon2 from './images/icon2.png'
import icon3 from './images/icon3.png'

const advantages = [
  { icon: <FeatureItemIcon src={icon1} alt="低门槛接入" />, title: '低门槛接入', desc: '降低音视频开发门槛，助力企业以更低成本、更高效率搭建更高质量的专属音视频应用。' },
  { icon: <FeatureItemIcon src={icon2} alt="可扩展性强" />, title: '可扩展性强', desc: '开源所有UI组件，客户可以按自己的需求快速个性化改造。' },
  { icon: <FeatureItemIcon src={icon3} alt="全场景支持" />, title: '全场景支持', desc: '覆盖泛娱乐互动直播、电商直播带货、语聊房在线教育等多应用场景。' }
]

export default function Advantage() {
  return (
    <Feature title="方案优势" name="advantage">
      <FeatureGroup>
        {
          advantages.map((item, i) => (
            <FeatureItem pos="top-down" align="justify" icon={item.icon} title={item.title} key={i}>
              <FeatureDesc>{item.desc}</FeatureDesc>
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}
