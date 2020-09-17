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
import Icon7 from './images/icon7.svg'
import Icon8 from './images/icon8.svg'
import Icon9 from './images/icon9.svg'

const products = [
  [
    { icon: <Icon1 />, title: '弹性扩展', desc: '按需购买，可灵活扩展。可支持存储集群 EB 级别容量、千亿级别文件数量规模' },
    { icon: <Icon2 />, title: '多协议支持', desc: '满足对象存储、文件存储、大数据存储应用，提供丰富的管控 API、存储 SDK 与相关工具' },
    { icon: <Icon3 />, title: '多数据冗余模型', desc: '一个存储池内同时支持多副本和 EC 纠删码，不同的数据保护策略，提供不同等级数据冗余和可靠性' }
  ],
  [
    { icon: <Icon4 />, title: '多级故障域', desc: '支持服务器、集群、区域三级别故障域管理' },
    { icon: <Icon5 />, title: '数据生命周期管理', desc: '支持存储桶数据生命周期管理，通过数据前缀或整桶进行转低频、归档和删除' },
    { icon: <Icon6 />, title: '访问控制', desc: '多租户管理、灵活的访问控制策略，满足企业多样化资源访问控制需求' }
  ],
  [
    { icon: <Icon7 />, title: '多媒体计算及 AI 分析', desc: '开放的多媒体计算平台，可使用平台自带和用户自定义数据处理服务，可一站式完成数据存储、处理' },
    { icon: <Icon8 />, title: '低成本运维', desc: '自动化部署，一键安装，即开即用。软硬件一体化管理平台，集成业务、集群、主机、存储、网络、告警六大组件' },
    { icon: <Icon9 />, title: '存储在线迁移方案', desc: '完善的在线迁移方案，0 中断业务情况下支持客户存储从原架构迁移至七牛云存储一体机' }
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
                <FeatureItem pos="top-down" align="left" icon={item.icon} title={item.title} key={i}>
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
