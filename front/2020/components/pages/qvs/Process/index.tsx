import React from 'react'
import { useMobile } from 'hooks/ua'
import Section from 'components/Product/Section'
import { RawAccessProcess as AccessProcess, Step } from 'components/Product/AccessProcess'
import GuideLink from 'components/Product/GuideLink'
import { Icon } from 'components/Product/Feature'

import step1 from './images/01.png'
import step2 from './images/02.png'
import step3 from './images/03.png'
import step4 from './images/04.png'

export default function Process() {
  const isMobile = useMobile()

  return (
    <Section name="access" title="接入流程">
      <AccessProcess>
        <Step icon={<Icon src={step1} />}>注册登录</Step>
        <Step icon={<Icon src={step2} />}>创建空间</Step>
        <Step icon={<Icon src={step3} />}>设备接入</Step>
        <Step icon={<Icon src={step4} />}>功能体验</Step>
      </AccessProcess>
      {!isMobile && (
        <GuideLink style={{ marginTop: '64px' }} href="https://portal.qiniu.com/qvs">
          立即使用
        </GuideLink>
      )}
    </Section>
  )
}
