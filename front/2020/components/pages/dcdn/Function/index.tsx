import React from 'react'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import DynamicStaticMixIcon from './images/dynamic-static-mix.svg'
import GlobalSourceIcon from './images/global-source.svg'
import SmartSchedulingIcon from './images/smart-scheduling.svg'
import PrivateProtocolIcon from './images/private-protocol.svg'
import LinkIcon from './images/link.svg'
import ThreeDQualityControlIcon from './images/threed-quality-control.svg'

const funcs = [
  [
    { icon: <DynamicStaticMixIcon />, title: '动静混合加速', desc: '采用动静混合智能分离技术，自动识别动静态资源，静态资源边缘缓存高效分发，动态资源决策最优链路回源，实现资源精准加速。' },
    { icon: <GlobalSourceIcon />, title: '资源覆盖全球', desc: '沉淀多年 CDN 管控经验，精选核心高质量节点，实现覆盖全球的边缘节点架构体系，国内无盲区覆盖各地、各运营商，海外广泛覆盖 70 多个国家和地区。' }
  ],
  [
    { icon: <SmartSchedulingIcon />, title: '智能调度系统', desc: '基于全网请求来源的智能调度系统，支持 DNS、HttpDNS、Http302 调度模式，有效提高访问响应速度，防止劫持，实现全网实时精准调度调度。' },
    { icon: <PrivateProtocolIcon />, title: '私有协议优化', desc: '使用私有传输协议作为 DCDN 内部数据交换的基础，确保客户资源安全、快速的传输到各个节点，实现客户内容高效、可靠的进行分发。' }
  ],
  [
    { icon: <LinkIcon />, title: '链路优化', desc: '七牛自研探测 AGENT，精确探测点到点之间的链路质量，凭借特有的链路决策算法，可以保证边缘节点到源站之间的所有链路最优。' },
    { icon: <ThreeDQualityControlIcon />, title: '立体品控', desc: '基于权威 APM 的全网覆盖「性能监控」和七牛自研的监控数据为基础上自研的全网「实时可用性监控」，打造七牛 DCDN 立体品控体系。' }
  ]
]

export default function DcdnFunction() {
  return (
    <Feature title="产品功能" name="function">
      {
        funcs.map((func, index) => (
          <FeatureGroup key={index}>
            {
              func.map((item, i) => (
                <FeatureItem pos="left-right" icon={item.icon} title={item.title} key={`${index}-${i}`}>
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
