/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 推流 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { Product } from 'constants/products'
import { useApiWithParams } from 'hooks/api'
import { useBtns } from 'hooks/product-btn'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import { useWechatConsultModal } from 'components/WechatConsultModal'

import ProductFeature from 'components/pages/plms/Feature'
import Demo from 'components/pages/plms/Demo'
import Scene from 'components/pages/plms/Scene'

import imgBanner from './images/banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const btns = useBtns(
    { children: '立即咨询', onClick: showWechatConsultModal },
    { children: '接入指南', href: 'https://developer.qiniu.com/pili/sdk/5028/push-the-sdk-download-experience' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Plms]
  })

  return (
    <>
      <PageBanner
        title="直播推流 SDK"
        desc="直播推流 SDK，由七牛音视频团队多年精心打磨，包体轻盈、接入简单，协助您快速搭建直播推流核心功能，同时可无缝对接美颜、滤镜、人脸贴纸等高级特效。"
        btns={btns.banner}
        icon={imgBanner} />

      <ProductNotice {...(currentNotices || notices)} />

      <Navigator>{btns.nav}</Navigator>

      <ProductFeature />
      <Scene />
      <Demo />
      <ProductNews newsRes={newsRes} />
      <LinkGroups title="相关文档">
        <LinkGroup title="使用文档">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/5028/push-the-sdk-download-experience">SDK 下载</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3778/PLMediaStreamingKit-overview">IOS 开发文档</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3715/PLDroidMediaStreaming-overview">Android 开发文档</LinkItem>
        </LinkGroup>
        <LinkGroup title="其他材料">
          <LinkItem href="https://www.qiniu.com/sdk-agreement">用户协议</LinkItem>
        </LinkGroup>
      </LinkGroups>
      <UsageGuide title="全方位体验直播推流 SDK">
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Page({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title="直播推流 SDK_推流 SDK_视频直播"
      keywords="直播推流 SDK, 直播 SDK, 第三方直播 SDK, ios 直播 SDK, android 直播 SDK, 第三方直播推流 SDK, ios 直播推流 SDK, android 直播推流 SDK"
      description="直播推流 SDK，由七牛音视频团队多年精心打磨，包体轻盈、接入简单，协助您快速搭建直播推流核心功能，同时可无缝对接美颜、滤镜、人脸贴纸等高级特效。"
      globalBanners={globalBanners}
    >
      <PageContent {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Plms),
      newsRes: await getNews({ product: Product.Plms }),
      globalBanners: await getGlobalBanners()
    }
  }
}
