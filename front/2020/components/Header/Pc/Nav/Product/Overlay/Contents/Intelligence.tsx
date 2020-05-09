import React from 'react'
import CdnIcon from './images/service/cdn.svg'
import CertIcon from './images/service/cert.svg'
import Item from './Item'

export default function Intelligence() {
  return (
    <>
      <Item href="/products/qcdn" icon={<CdnIcon />} title="智能日志管理平台" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="/ssl" icon={<CertIcon />} title="机器数据分析平台" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
    </>
  )
}
