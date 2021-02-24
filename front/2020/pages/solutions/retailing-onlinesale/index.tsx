/**
 * @file          component  retailing-onlinesale
 * @description   新零售在线销售解决方案
 * @author        renpanpan
 */
import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'

import Process from 'components/pages/retailing-onlinesale/Process'
import Architecture from 'components/pages/retailing-onlinesale/Architecture'
import Advantage from 'components/pages/retailing-onlinesale/Advantage'
import Cases from 'components/pages/retailing-onlinesale/Cases'

import banner from './banner.png'

function Page() {

  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="新零售在线销售解决方案"
        desc="新零售时代的来临促使传统零售业将生产、流通、销售等环节进行数字化改造。七牛云基于智能视频云技术打造「新零售在线销售解决方案」，赋能新零售行业从无到有的起步和发展，有针对性的为商家和消费者之间建立连接，实现商家和消费者的双向互动。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Process />

      <Architecture />

      <Advantage />

      <Cases />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={startConsulting}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="新零售在线销售解决方案_在线销售_新零售行业_智能视频云_视频解决方案_视觉智能_实时音视频"
      keywords="智能视频云, 智能视频, 视频云, 视频云服务, 视频云存储, 视频云平台, 新零售, 在线销售, 解决方案"
      description="新零售时代的来临促使传统零售业将生产、流通、销售等环节进行数字化改造。七牛云基于智能视频云技术打造「新零售在线销售解决方案」，赋能新零售行业从无到有的起步和发展，有针对性的为商家和消费者之间建立连接，实现商家和消费者的双向互动。"
    >
      <Page />
    </Layout>
  )
}
