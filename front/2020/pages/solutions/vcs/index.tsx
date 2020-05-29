/**
 * @file 解决方案”视频冷存储“
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import VcsFeature from 'components/pages/vcs/Feature'
import Navigator from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import VcsIndustry from 'components/pages/vcs/Industry'
import VcsAdvantage from 'components/pages/vcs/Advantage'
import VcsScene from 'components/pages/vcs/Scene'
import VcsCase from 'components/pages/vcs/Case'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useBtns } from 'hooks/product-btn'

import imgBanner from './images/banner.png'

function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const btns = useBtns(
    { onClick: handleConsult, children: '立即咨询' },
    { href: '/products/kodo', children: '了解更多' }
  )

  return (
    <>
      <PageBanner
        title="视频冷存储解决方案"
        desc="七牛云视频冷存储解决方案是专为综合视频平台打造的 EB 级数据存储解决方案，
        低成本高可用，有效帮助客户承载突发流量，控制访问延时，优化写入性能。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <VcsFeature />

      <Navigator>{btns.nav}</Navigator>

      <VcsIndustry />

      <VcsAdvantage />

      <VcsScene />

      <VcsCase />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function VcsPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
