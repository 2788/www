import React, { ReactNode } from 'react'

import BaseWrapper from 'components/agreement/BaseWrapper'

type AgreementWrapperProps = {
  children: ReactNode
}

export default function Wrapper({ children }: AgreementWrapperProps) {
  const links = [
    { href: '/agreements/user-agreement', text: '服务用户协议' },
    { href: '/agreements/identity', text: '实名认证授权协议' },
    { href: '/agreements/privacy-right', text: '隐私权政策' },
    { href: '/agreements/sla/kodo', text: '对象存储 SLA' },
    { href: '/agreements/sla/fusion', text: 'CDN SLA' },
    { href: '/agreements/sla/pili', text: '直播云 SLA' },
    { href: '/agreements/sla/dora', text: '智能多媒体服务 SLA' },
    { href: '/agreements/sla/qvm', text: '云服务器 QVM SLA' },
    { href: '/agreements/sla/sms', text: '云短信 SLA' },
    { href: '/agreements/sdk-agreement', text: '短视频 SDK 服务协议' }
  ]

  return (
    <BaseWrapper links={links}>{children}</BaseWrapper>
  )
}

