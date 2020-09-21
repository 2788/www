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

const products = [
  [
    { icon: <Icon1 />, title: 'P2P 协议支持', desc: '支持 4K/8K 视频点播的 P2P 算法 ，可对抗 500ms 延迟和 50% 丢包。P2P 分享比例接近 100%，不依赖 TCP 协议' },
    { icon: <Icon2 />, title: '弱网传输优化', desc: '弱网环境下卡顿率比 Google BBR 优 20+ 倍，极大提升弱网的客户体验' },
    { icon: <Icon3 />, title: '精益调度', desc: '基于流控的带宽配额控制，调度 CDN 及 P2P 流量，保证体验的前提下，最大化 P2P 分享比，最大程度降低流量成本' }
  ],
  [
    { icon: <Icon4 />, title: '多种接入方式', desc: '支持 SDK、Cname 接入，不改变客户现有技术体系；数据自动注册到 PCDN 网络，无需任何数据迁移' },
    { icon: <Icon5 />, title: '存储创新', desc: '节点存储效率比传统 P2P 提升百倍，能高效使用小设备，支持冷数据和长尾文件' },
    { icon: <Icon6 />, title: '快速推送', desc: '智能识别冷热数据，动态选择边缘节点，快速推送部署数据，快速形成 P2P 服务能力' }
  ]
]

export default function Product() {
  return (
    <Feature title="产品功能" name="product">
      {
        products.map((product, index) => (
          <FeatureGroup key={index}>
            {
              product.map((item, i) => (
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
