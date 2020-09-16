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

export default function Advantage() {
  const advantages = [
    [
      { icon: <Icon1 />, title: '快速交付', desc: '一体化设计，极简配置，支撑一键部署与升级，快速交付可用的云存储平台' },
      { icon: <Icon2 />, title: '云原生支持', desc: '为客户提供云原生支持的存储服务，支持弹性扩展，满足客户快速构建 IT 平台的需要' }
    ],
    [
      { icon: <Icon3 />, title: '开放平台', desc: '多服务标准协议支持，满足对象存储（ S3 ， qiniu API ）、文件存储（ POSIX 、 NFS 、 CIFS 等）、大数据存储（ HDFS 兼容）应用，提供丰富的管控 API 、存储 SDK 与相关工具，适应灵活的应用场景' },
      { icon: <Icon4 />, title: '超大规模', desc: '集群容量达 EB 级，文件千亿级，满足超大规模存储应用场景' }
    ],
    [
      { icon: <Icon5 />, title: '资源利用率高', desc: '接近五副本的安全性，满足高达 87.5 %得盘率，用高效 EC 技术充分挖掘硬件价值' },
      { icon: <Icon6 />, title: '容灾备份', desc: '提供本地双活、三活集群方案，以及异地容灾方案，满足业务持续性保证' }
    ],
    [
      { icon: <Icon7 />, title: '智能处理', desc: '可选包含 Dora Platform 多媒体处理与机器视觉智能开放平台' }
    ]
  ]
  return (
    <Feature title="核心优势" name="advantage">
      {
        advantages.map((advantage, index) => (
          <FeatureGroup key={index}>
            {
              advantage.map((item, i) => (
                <FeatureItem pos="left-right" icon={item.icon} title={item.title} key={i}>
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
