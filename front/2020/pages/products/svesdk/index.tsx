/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 短视频特效 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { useBtns } from 'hooks/product-btn'
import { useMobile } from 'hooks/ua'
import { useApiWithParams } from 'hooks/api'

import { Product } from 'constants/products'
import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import AccessProcess, { Step } from 'components/Product/AccessProcess'
import Link from 'components/Link'

import Advantage from 'components/pages/svesdk/Advantage'
import ProductFeature from 'components/pages/svesdk/Feature'
import Demo from 'components/pages/svesdk/Demo'
import Scene from 'components/pages/svesdk/Scene'

import bannerPc from './images/banner-pc.jpg'
import bannerMobile from './images/banner-mobile.jpg'
import Step1 from './images/step1.svg'
import Step2 from './images/step2.svg'
import Step3 from './images/step3.svg'
import Step4 from './images/step4.svg'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {
  const isMobile = useMobile()
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { children: '立即咨询', onClick: showWechatConsultModal },
    { children: 'Demo 下载', href: '#demo' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Svesdk]
  })

  return (
    <>
      <PageBanner
        title="短视频特效 SDK"
        desc="七牛短视频特效 SDK，在七牛短视频 SDK 中集成了美颜特效功能。其不仅拥有七牛短视频 SDK 本身提供的拍摄、编辑、上传等能力，还集成了美颜、滤镜、动态贴纸、美妆、微整形等特效功能，旨在帮助开发者一站式打造一款拥有美颜特效功能的专业的短视频拍摄工具，让用户的拍摄更美丽有趣。"
        btns={btns.banner}
        bgImgUrl={isMobile ? bannerMobile : bannerPc}
      />

      <ProductNotice {...(currentNotices || notices)} />

      <Navigator>{btns.nav}</Navigator>

      <Advantage />
      <ProductFeature />
      <Scene />
      <Demo />
      <ProductNews newsRes={newsRes} />
      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3955/short-video-quick-guide">短视频 SDK 快速接入指南</LinkItem>
          <LinkItem href="https://github.com/pili-engineering/PLDroidShortVideo-ByteDance">Android SDK 接入指南</LinkItem>
          <LinkItem href="https://github.com/pili-engineering/PLShortVideoKit-ByteDance">iOS SDK 接入指南</LinkItem>
        </LinkGroup>
      </LinkGroups>
      <AccessProcess header="接入流程">
        <Step icon={<Step1 />} onClick={showWechatConsultModal}>
          <Link blue onClick={showWechatConsultModal}>售前咨询 &gt;&gt;</Link>
        </Step>
        <Step icon={<Step2 />}>申请试用</Step>
        <Step icon={<Step3 />}>接入测试</Step>
        <Step icon={<Step4 />}>正式购买</Step>
      </AccessProcess>
      <UsageGuide title="全方位体验短视频特效 SDK">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Page({ globalBanners, ...pageProps }: Props) {
  return (
    <headerThemeContext.Provider value="dark">
      <Layout
        title="短视频特效 SDK"
        keywords="短视频特效SDK, 短视频SDK, 七牛云, 七牛短视频, 短视频特效"
        description="七牛短视频特效 SDK，在七牛短视频 SDK 中集成了美颜特效功能。其不仅拥有七牛短视频 SDK 本身提供的拍摄、编辑、上传等能力，还集成了美颜、滤镜、动态贴纸、美妆、微整形等特效功能，旨在帮助开发者一站式打造一款拥有美颜特效功能的专业的短视频拍摄工具，让用户的拍摄更美丽有趣。"
        globalBanners={globalBanners}
      >
        <PageContent {...pageProps} />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Svesdk),
      newsRes: await getNews({ product: Product.Svesdk }),
      globalBanners: await getGlobalBanners()
    }
  }
}
