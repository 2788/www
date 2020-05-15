/**
 * @file 解决方案”监控视频边缘存储“
 */

import React, { ReactNode } from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator, { Button as NavButton } from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import UIButton from 'components/UI/Button'
import EssArch from 'components/pages/ess/Arch'
import EssIndustry from 'components/pages/ess/Industry'
import EssUnique from 'components/pages/ess/Unique'
import EssAdvantage from 'components/pages/ess/Advantage'
import EssScene from 'components/pages/ess/Scene'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import BannerIcon from './images/banner-icon.svg'

function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const bannerBtns: ReactNode[] = [(
    <UIButton key="consult" onClick={handleConsult}>
      立即咨询
    </UIButton>
  ), (
    <UIButton key="download" type="hollow" href="/solutions/ess">
      了解更多
    </UIButton>
  )]

  return (
    <>
      <PageBanner
        title="监控视频边缘存储解决方案"
        desc="面向视频监控行业，在七牛云边缘节点和用户侧部署边缘存储服务，加速视频数据边缘上传，
        自动同步边缘中心数据，有效解决上传链路差，带宽利用率低等行业痛点，降低本地存储成本。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <Navigator>
        <NavButton type="primary" onClick={handleConsult}>立即咨询</NavButton>
        <NavButton withBorder href="/solutions/ess">了解更多</NavButton>
      </Navigator>

      <EssArch />

      <EssIndustry />

      <EssUnique />

      <EssAdvantage />

      <EssScene />

      <UsageGuide
        title="欢迎联系我们了解更多行业成功案例经验"
      >
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EssPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
