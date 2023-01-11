/**
 * @file    互动直播解决方案
 * @author  renpanpan
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { Product } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useWechatConsultModal } from 'components/WechatConsultModal'
import { useBtns } from 'hooks/product-btn'
import { useMobile } from 'hooks/ua'
import { getGlobalBanners } from 'apis/admin/global-banners'

import Architecture from 'components/pages/rtclive/Architecture'
import Scene from 'components/pages/rtclive/Scene'
import Advantage from 'components/pages/rtclive/Advantage'
import Demo from 'components/pages/rtclive/Demo'

import bannerPc from './banner-pc.jpg'
import bannerMobile from './banner-mobile.jpg'

const title = `${nameMap[Solution.Rtclive]}解决方案`

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Page() {
  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' },
    { href: 'https://portal.qiniu.com/rtn/app', children: '开始使用' },
    { href: '#demo', children: 'DEMO 体验' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="一个 SDK 解决客户端直播推流及连麦互动，提供商用级开源 UI 辅助快速上线，支持美颜滤镜功能快速接入。"
        btns={btns.banner}
        bgImgUrl={isMobile ? bannerMobile : bannerPc}
      />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <Architecture />

      <Advantage />

      <Demo />

      <Section name="related" title="相关产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Rtn} />
          <RelatedProduct product={Product.Pili} />
          <RelatedProduct product={Product.Beautysdk} />
          <RelatedProduct product={Product.Dora} />
        </Related>
        <Related>
          <RelatedProduct product={Product.Censor} />
          <RelatedProduct product={Product.Avsmart} />
          <RelatedProduct product={Product.Cdn} />
          <RelatedProduct product={Product.Kodo} />
        </Related>
      </Section>

      <UsageGuide title="实时音视频 QRTC，每月尽享 20000 分钟免费时长">
        <UsageGuideButton href="https://portal.qiniu.com/rtn/app">
          开始使用
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function RtclivePage({ globalBanners }: Props) {
  return (
    <headerThemeContext.Provider value="light">
      <Layout
        title={title}
        keywords="社交连麦, 互动直播, 超大房间互动直播, 商用级开源, 美颜, 美颜特效, 连麦 PK, 视频交友, 语聊房, FM 电台, 在线 KTV, 一起看视频, 一站式方案, 双模式可用, 快速接入, 美颜美妆, 高性能网络, 全链路监控"
        description="一个 SDK 解决客户端直播推流及连麦互动，提供商用级开源 UI 辅助快速上线，支持美颜滤镜功能快速接入。"
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
