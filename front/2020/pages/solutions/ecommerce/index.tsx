/**
 * @file 电商网购解决方案
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { Solution, nameMap } from 'constants/solutions'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Scene from 'components/pages/ecommerce/Scene'
import Advantage from 'components/pages/ecommerce/Advantage'
import EcProduct from 'components/pages/ecommerce/Product'
import Cases from 'components/pages/ecommerce/Cases'

import banner from './banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const title = `${nameMap[Solution.ECommerce]}解决方案`

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
        desc="为不同类型、不同规模的电商企业提供图片处理、短视频、音视频直播、连麦互动等技术，灵活构建社交电商、内容电商、垂直电商、跨境电商等电商类型，促进平台获客和交易转化，提升用户线上购物体验。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <Advantage />

      <EcProduct />

      <Cases onConsult={handleConsult} />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EcommercePage({ globalBanners }: Props) {
  return (
    <Layout
      title="电商网购_图文电商_直播带货_PK带货_产地连麦_文玩电商_美妆电商"
      keywords="电商网购, 图文电商, 直播带货, PK 带货, 产地连麦, 文玩电商, 美妆电商"
      description="为不同类型、不同规模的电商企业提供图片处理、短视频、音视频直播、连麦互动等技术，灵活构建社交电商、内容电商、垂直电商、跨境电商等电商类型，促进平台获客和交易转化，提升用户线上购物体验。"
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
