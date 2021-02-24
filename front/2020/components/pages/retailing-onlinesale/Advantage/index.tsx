import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import Icon1 from './images/icon1.svg'
import Icon2 from './images/icon2.svg'

const advantages = [
  { icon: <Icon1 />, title: '直播带货同时，可实时线上连麦咨询', desc: '客户观看直播时，可主动与主播或助理视频连麦，在线视频咨询商品购买。整个过程无需下载 App' },
  { icon: <Icon2 />, title: '精细化的数据记录', desc: '根据客户直播观看的行为数据，通过精细化的数据分析，建立相对完善的私域客户画像，明确客户消费偏好，进而引导销售人员针对性跟进客户，成交成单' }
]

export default function Advantage() {
  return (
    <Feature title="方案优势" name="advantage">
      <FeatureGroup>
        {
          advantages.map((item, index) => (
            <FeatureItem pos="left-right" icon={item.icon} title={item.title} key={index}>
              <FeatureDesc>{item.desc}</FeatureDesc>
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}
