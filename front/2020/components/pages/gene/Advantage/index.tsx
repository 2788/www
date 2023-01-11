import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon
} from 'components/Product/Feature'

import icon1 from './images/advantage1.png'
import icon2 from './images/advantage2.png'
import icon3 from './images/advantage3.png'
import icon4 from './images/advantage4.png'

const advantages = [
  [
    { icon: <Icon src={icon1} />, title: '按需灵活可扩展', desc: '完全按业务弹性扩展所需的计算、存储、网络等资源，按需付费。' },
    { icon: <Icon src={icon2} />, title: '可扩展、高可靠的存储资源池', desc: '支持数千节点的集群规模，容量可达 EB 级；实现在线的快速扩容，无需中断业务；随容量扩容，性能线性增加。' }
  ],
  [
    { icon: <Icon src={icon3} />, title: '数据生命周期管理', desc: '按照数据特征进行数据生命周期管理，满足长期数据存储的成本需求。' },
    { icon: <Icon src={icon4} />, title: '安全可靠合规', desc: '多层级的数据安全防护。提供严格的访问控制、服务端加密、Bucket Policy 授权等策略；通过记录操作日志到空间日志，满足审计需求。' }
  ]
]

export default function Advantage() {
  return (
    <Feature title="方案优势" name="advantage">
      {
        advantages.map((advantage, index) => (
          <FeatureGroup key={index}>
            {
              advantage.map(item => (
                <FeatureItem pos="left-right" icon={item.icon} title={item.title} key={item.title}>
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
