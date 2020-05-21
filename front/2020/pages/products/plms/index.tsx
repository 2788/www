/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 推流 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode } from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import UIButton from 'components/UI/Button'
import Navigator from 'components/Product/Navigator'
import PageNotice, { Group as PageNoticeGroup, Item as PageNoticeItem } from 'components/Product/PageNotice'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import ProductFeature from 'components/pages/plms/Feature'
import Demo from 'components/pages/plms/Demo'
import Scene from 'components/pages/plms/Scene'

import BannerIcon from './images/banner.svg'

export function Content() {

  const bannerBtns: ReactNode[] = [
    <UIButton key="try" href="TODO">
      免费体验
    </UIButton>,
    <UIButton key="guide" href="https://developer.qiniu.com/pili/sdk/5028/push-the-sdk-download-experience" type="hollow">
      接入指南
    </UIButton>
  ]

  return (
    <>
      <PageBanner
        title="直播推流 SDK"
        desc="直播推流SDK，由七牛音视频团队多年精心打磨，包体轻盈、接入简单，协助您快速搭建直播推流核心功能，同时可无缝对接美颜、滤镜、人脸贴纸等高级特效。"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="welfares">
          <PageNoticeItem href="/products/plesdk">
            直播特效SDK落地页
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator />

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
      <UsageGuide title="注册即可体验全方位实时音视频">
        <UsageGuideButton href="TODO">
          免费体验
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Page() {
  return (
    <Layout>
      <Content />
    </Layout>
  )
}
