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

const groupsMap = [
  [
    {
      title: '专业专项',
      desc: '具备独家自研规则 + 深度学习 + 主动防御的多重防护引擎规则，且支持自定义规则',
      icon: <Icon1 />
    },
    {
      title: '高度容灾',
      desc: '多线路节点容灾，毫秒级响应，最优化路径原则，最高可支持百万 QPS 业务接入防护',
      icon: <Icon2 />
    },
    {
      title: '及时更新',
      desc: '小时级更新 Web 漏洞数据库系统，含七牛云独家 0-day 小时级自动防御',
      icon: <Icon3 />
    }
  ],
  [
    {
      title: '涵盖面广',
      desc: '漏洞、Web 攻击、机器流量、数据及账户安全等一站式防护',
      icon: <Icon4 />
    },
    {
      title: '安全合规',
      desc: '满足等保合规、PCI-DSS 等要求，助力企业安全合规建设',
      icon: <Icon5 />
    },
    {
      title: '丰富场景',
      desc: '满足各类公有云、混合云、IDC、线下机房等多种云平台部署场景',
      icon: <Icon6 />
    }
  ]
]

export default function Advantage() {
  return (
    <Feature title="核心优势" name="advantage">
      {
        groupsMap.map((group, index) => (
          <FeatureGroup key={index}>
            {
              group.map(item => (
                <FeatureItem title={item.title} icon={item.icon} key={item.title} align="left">
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
