/**
 * @file 电商网购解决方案
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { Solution, nameMap } from 'constants/solutions'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useWechatConsultModal } from 'components/WechatConsultModal'
import { useBtns } from 'hooks/product-btn'
import { useMobile } from 'hooks/ua'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Scene from 'components/pages/ecommerce/Scene'
import Advantage from 'components/pages/ecommerce/Advantage'
import EcProduct from 'components/pages/ecommerce/Product'
import Cases from 'components/pages/ecommerce/Cases'

import bannerPc from './banner-pc.jpg'
import bannerMobile from './banner-mobile.jpg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const title = `${nameMap[Solution.ECommerce]}解决方案`

function Page() {
  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="为不同类型、不同规模的电商企业提供图片处理、短视频、音视频直播、连麦互动等技术，灵活构建社交电商、内容电商、垂直电商、跨境电商等电商类型，促进平台获客和交易转化，提升用户线上购物体验。"
        btns={btns.banner}
        bgImgUrl={isMobile ? bannerMobile : bannerPc}
      />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <Advantage />

      <EcProduct />

      <Cases onConsult={showWechatConsultModal} />

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EcommercePage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="电商网购_图文电商_直播带货_PK带货_产地连麦_文玩电商_美妆电商"
        keywords="电商网购, 图文电商, 直播带货, PK 带货, 产地连麦, 文玩电商, 美妆电商"
        description="为不同类型、不同规模的电商企业提供图片处理、短视频、音视频直播、连麦互动等技术，灵活构建社交电商、内容电商、垂直电商、跨境电商等电商类型，促进平台获客和交易转化，提升用户线上购物体验。"
        globalBanners={globalBanners}
      >
        <Page />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
