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
      <Item href="TODO" icon={<CdnIcon />} title="CDN" subtitle="高可用、易扩展、低成本、一站式、支持边缘存储" />
      <Item href="TODO" icon={<CertIcon />} title="证书" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
      <Item href="TODO" icon={<LiveIcon />} title="直播" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
      <Item href="TODO" icon={<VmIcon />} title="云主机" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
      <Item href="TODO" icon={<SmsIcon />} title="云短信" subtitle="自然场景下对整图和文字进行检测、定位和识别超出两行的情况" />
    </>
  )
}
