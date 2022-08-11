/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 短视频 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { Product } from 'constants/products'
import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import Feature from 'components/pages/plsv/Feature'
import PriceList from 'components/pages/plsv/PriceList'
import Demo from 'components/pages/plsv/Demo'
import Scene from 'components/pages/plsv/Scene'

import imgBanner from './images/banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {

  const btns = useBtns(
    { children: '免费体验', href: 'https://qmall.qiniu.com/template/MTE1', pcOnly: true },
    { children: '接入指南', href: 'https://developer.qiniu.com/pili/sdk/3955/short-video-quick-guide' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Plsv]
  })

  return (
    <>
      <PageBanner
        title="短视频 SDK"
        desc="短视频 SDK，由七牛音视频团队潜心研发。100+ 功能覆盖绝大部分视频拍摄和编辑场景，本地转码性能优异，更支持对接第三方视频滤镜、人脸贴纸、背景分割等高级功能，协助您打造一站式手机视频制作工具。"
        btns={btns.banner}
        icon={imgBanner} />

      <ProductNotice {...(currentNotices || notices)} />

      <Navigator>{btns.nav}</Navigator>

      <Feature />
      <Scene />
      <PriceList />
      <Demo />
      <ProductNews newsRes={newsRes} />
      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3955/short-video-quick-guide">接入指南</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3731/short-video">功能列表</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3920/short-video-demo-download">SDK 下载</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3733/short-video-ios-sdk">iOS 开发文档</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3734/android-short-video-sdk">Android 开发文档</LinkItem>
        </LinkGroup>
        <LinkGroup title="其他材料">
          <LinkItem href="https://www.qiniu.com/sdk-agreement">用户协议</LinkItem>
        </LinkGroup>
      </LinkGroups>
      <UsageGuide title="注册即可全方位体验短视频 SDK">
        <UsageGuideButton href="https://qmall.qiniu.com/template/MTE1">
          免费体验
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function PlsvPage({ globalBanners, ...pageProps }: Props) {
  return (
    <Layout
      title="短视频 SDK_短视频特效 SDK"
      keywords="短视频 SDK, 七牛短视频, 短视频服务, 短视频解决方案, ios 短视频 sdk, android 短视频 sdk"
      description="短视频 SDK，由七牛音视频团队潜心研发。100+ 功能覆盖绝大部分视频拍摄和编辑场景，本地转码性能优异，更支持对接第三方视频滤镜、人脸贴纸、背景分割等高级功能，协助您打造一站式手机视频制作工具。"
      globalBanners={globalBanners}
    >
      <PageContent {...pageProps} />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Plsv),
      newsRes: await getNews({ product: Product.Plsv }),
      globalBanners: await getGlobalBanners()
    }
  }
}
