import React from 'react'
import CdnIcon from './images/service/cdn.svg'
import CertIcon from './images/service/cert.svg'
import LiveIcon from './images/service/live.svg'
import SmsIcon from './images/service/sms.svg'
import VmIcon from './images/service/vm.svg'
import Item from './Item'

export default function Service() {
  return (
    <>
      <Item href="/products/qcdn" icon={<CdnIcon />} title="CDN" subtitle="优质节点、可监控、智能调度的内容分发服务" />
      <Item href="/ssl" icon={<CertIcon />} title="证书" subtitle="提供 SSL 证书申请、管理等一站式服务" />
      <Item href="/products/pili" icon={<LiveIcon />} title="直播" subtitle="提供全球化实时流服务和端到端直播场景解决方案" />
      <Item href="/products/qvm" icon={<VmIcon />} title="云主机" subtitle="提供云主机、负载均衡、云数据库、高防等服务" />
      <Item href="/products/sms" icon={<SmsIcon />} title="云短信" subtitle="致力于为用户提供快捷高效的通信服务能力" />
    </>
  )
}
