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

const data = [
  { icon: <Icon1 />, title: '高性能视频压缩编码', desc: '结合智能码率控制算法，实现更低的码率提供更高清的视频' },
  { icon: <Icon2 />, title: '智能场景识别', desc: '根据场景内容自适应转码，处理场景多变的视频更游刃有余' },
  { icon: <Icon3 />, title: '高度可定制', desc: '接入简单，成熟稳定，高效灵活的 API 接口，为用户量身定制' },
  { icon: <Icon4 />, title: '画质增强', desc: '保持纹理细节的同时，降低视频噪声并强化物体边缘，提高视频清晰度，给用户带来全新的高清视野' }
]

export default function Function() {
  return (
    <Feature title="产品功能" name="function">
      <FeatureGroup>
        {
          data.map((item, index) => (
            <FeatureItem pos="top-down" align="left" icon={item.icon} title={item.title} key={index}>
              <FeatureDesc>{item.desc}</FeatureDesc>
            </FeatureItem>
          ))
        }
      </FeatureGroup>
    </Feature>
  )
}
