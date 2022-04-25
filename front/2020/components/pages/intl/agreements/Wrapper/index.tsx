import React, { ReactNode } from 'react'

import BaseWrapper from 'components/agreement/BaseWrapper'

type AgreementWrapperProps = {
  children: ReactNode
}

export default function Wrapper({ children }: AgreementWrapperProps) {
  const links = [
    { href: '/intl/agreements/user-agreement', text: '服务用户协议' },
    { href: '/intl/agreements/privacy-right', text: '隐私权政策' }
  ]

  return (
    <BaseWrapper links={links}>{children}</BaseWrapper>
  )
}

