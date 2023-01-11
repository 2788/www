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
import icon5 from './images/icon5.png'
import icon6 from './images/icon6.png'

const advantages = [
  [
    {
      icon: <FeatureIcon src={icon1} />,
      title: '公有云式体验',
      desc: ['核心架构源自公有云存储，经过长年海量客户验证', '自服务式按需弹性使用数据存储和处理服务', '集成公有云级别的运维管理能力']
    },
    {
      icon: <FeatureIcon src={icon2} />,
      title: '开箱即用极简运维',
      desc: ['预集成存储系统，管理平台，数据访问平台，智能数据处理平台', '一键扩容，软硬一体的管理和监控。数据自愈，免人工介入']
    },
    {
      icon: <FeatureIcon src={icon3} />,
      title: '一体化数据中台',
      desc: ['Qiniu 对象协议，S3，NFS，SMB 多协议支持，无缝对接 Hadoop 生态，一份数据多业务共享', '构建统一平台实现数据生命周期管理，数据分层管理']
    }
  ],
  [
    {
      icon: <FeatureIcon src={icon4} />,
      title: '智能多媒体服务',
      desc: ['丰富的图片处理，视频转码，水印，截图，瘦身等多媒体处理功能，支持自定义数据处理', '简化数据处理开发，提升数据使用效率']
    },
    {
      icon: <FeatureIcon src={icon5} />,
      title: '按需弹性海量拓展',
      desc: ['单节点 500 TB 容量，EB 级别扩展能力', '模块化扩展，性能线性提升']
    },
    {
      icon: <FeatureIcon src={icon6} />,
      title: '低成本与高可靠统一',
      desc: ['高达 90% 的存储空间利用率', '支持节点/机架/数据中心多等级可靠性保护', '支持双活/多机房/跨区域数据保护']
    }
  ]
]

export default function Advantage({ title }: { title: string }) {
  return (
    <Feature title={title} name="advantage">
      {
        advantages.map((advantage, index) => (
          <FeatureGroup key={index}>
            {
              advantage.map((item, i) => (
                <FeatureItem pos="top-down" align="left" icon={item.icon} title={item.title} key={i}>
                  {
                    item.desc.map((text, j) => (
                      <FeatureDesc preIcon="check" key={j}>{text}</FeatureDesc>
                    ))
                  }
                </FeatureItem>
              ))
            }
          </FeatureGroup>

        ))
      }
    </Feature>
  )
}
