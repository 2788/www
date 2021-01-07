/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 推流 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'
import { Product } from 'constants/products'
import { useBtns } from 'hooks/product-btn'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'

import { getNotices, INotice } from 'apis/admin/notice'
import ProducNotice from 'components/Product/common/ProducNotice'

import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'
import { useModal } from 'components/Feedback'

import ProductFeature from 'components/pages/plms/Feature'
import Demo from 'components/pages/plms/Demo'
import Scene from 'components/pages/plms/Scene'

import imgBanner from './images/banner.png'

export function Content({ notices }: { notices: INotice[] }) {
  const { startConsulting } = useModal()

  const btns = useBtns(
    { children: '立即咨询', onClick: startConsulting },
    { children: '接入指南', href: 'https://developer.qiniu.com/pili/sdk/5028/push-the-sdk-download-experience' }
  )

  return (
    <>
      <PageBanner
        title="直播推流 SDK_推流 SDK_视频直播"
        desc="直播推流 SDK，由七牛音视频团队多年精心打磨，包体轻盈、接入简单，协助您快速搭建直播推流核心功能，同时可无缝对接美颜、滤镜、人脸贴纸等高级特效。"
        btns={btns.banner}
        icon={imgBanner} />

      <ProducNotice notices={notices} />

      <Navigator>{btns.nav}</Navigator>

      <ProductFeature />
      <Scene />
      <Demo />
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
        <UsageGuideButton onClick={startConsulting}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Page({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="直播推流 SDK_推流 SDK_视频直播"
      keywords="直播推流 SDK, 直播 SDK, 第三方直播 SDK, ios 直播 SDK, android 直播 SDK, 第三方直播推流 SDK, ios 直播推流 SDK, android 直播推流 SDK"
      description="直播推流 SDK，由七牛音视频团队多年精心打磨，包体轻盈、接入简单，协助您快速搭建直播推流核心功能，同时可无缝对接美颜、滤镜、人脸贴纸等高级特效。"
    >
      <Content notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Plms)
    }
  }
}
