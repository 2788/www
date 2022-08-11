/**
 * @file          component  fin-onlinesale
 * @description   金融产品在线营销解决方案
 * @author        renpanpan
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Process from 'components/pages/fin-onlinesale/Process'
import Architecture from 'components/pages/fin-onlinesale/Architecture'
import Advantage from 'components/pages/fin-onlinesale/Advantage'
import Cases from 'components/pages/fin-onlinesale/Cases'

import banner from './banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

// TODO: `constants/solutions` 中没有对应的定义，需要添加 @renpanpan5
const title = '金融产品在线营销解决方案'

function Page() {

  const { startIntentConsulting } = useFeedbackModal()
  const handleConsult = () => startIntentConsulting(title)

  const btns = useBtns(
    { onClick: handleConsult, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="保险、基金等产品面临销售渠道线上化运营，如何依托线上流量与私域流量进行裂变转化，维护存量客户、提高客户质量对企业的发展至关重要。七牛云基于智能视频云技术打造「金融产品在线营销解决方案」，为金融产品在线营销提供智能、高效、一站式的视频解决方案，并提供完整的数据分析与处理服务，推动业务成交。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Process />

      <Architecture />

      <Advantage />

      <Cases onConsult={handleConsult} />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Main({ globalBanners }: Props) {
  return (
    <Layout
      title="金融产品在线营销解决方案_在线营销_金融产品_智能视频云_视频解决方案_视觉智能_实时音视频"
      keywords="智能视频云, 智能视频, 视频云, 视频云服务, 视频云存储, 视频云平台, 金融产品, 在线营销, 解决方案"
      description="保险、基金等产品面临销售渠道线上化运营，如何依托线上流量与私域流量进行裂变转化，维护存量客户、提高客户质量对企业的发展至关重要。七牛云基于智能视频云技术打造「金融产品在线营销解决方案」，为金融产品在线营销提供智能、高效、一站式的视频解决方案，并提供完整的数据分析与处理服务，推动业务成交。"
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
