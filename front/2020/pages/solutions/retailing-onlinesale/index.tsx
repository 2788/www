/**
 * @file          component  retailing-onlinesale
 * @description   新零售在线销售解决方案
 * @author        renpanpan
 */
import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useWechatConsultModal } from 'components/WechatConsultModal'
import { useBtns } from 'hooks/product-btn'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Process from 'components/pages/retailing-onlinesale/Process'
import Architecture from 'components/pages/retailing-onlinesale/Architecture'
import Advantage from 'components/pages/retailing-onlinesale/Advantage'
import Cases from 'components/pages/retailing-onlinesale/Cases'

import banner from './banner.png'

// TODO: `constants/solutions` 中没有对应的定义，需要添加 @renpanpan5
const title = '新零售在线销售解决方案'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {

  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="新零售时代的来临促使传统零售业将生产、流通、销售等环节进行数字化改造。七牛云基于智能视频云技术打造「新零售在线销售解决方案」，赋能新零售行业从无到有的起步和发展，有针对性的为商家和消费者之间建立连接，实现商家和消费者的双向互动。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Process />

      <Architecture />

      <Advantage />

      <Cases onConsult={showWechatConsultModal} />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Main({ globalBanners }: Props) {
  return (
    <Layout
      title="新零售在线销售解决方案_在线销售_新零售行业_智能视频云_视频解决方案_视觉智能_实时音视频"
      keywords="智能视频云, 智能视频, 视频云, 视频云服务, 视频云存储, 视频云平台, 新零售, 在线销售, 解决方案"
      description="新零售时代的来临促使传统零售业将生产、流通、销售等环节进行数字化改造。七牛云基于智能视频云技术打造「新零售在线销售解决方案」，赋能新零售行业从无到有的起步和发展，有针对性的为商家和消费者之间建立连接，实现商家和消费者的双向互动。"
      globalBanners={globalBanners}
    >
      <Page />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
