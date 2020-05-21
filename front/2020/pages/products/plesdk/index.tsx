/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 直播特效 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React, { ReactNode } from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import UIButton from 'components/UI/Button'
import Navigator from 'components/Product/Navigator'
import { useModal } from 'components/Feedback'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import Advantage from 'components/pages/plesdk/Advantage'
import ProductFeature from 'components/pages/plesdk/Feature'
import Demo from 'components/pages/plesdk/Demo'
import Scene from 'components/pages/plesdk/Scene'

import BannerIcon from './images/banner.svg'

export function Content() {
  const { showModal } = useModal()
  // TODO 咨询逻辑
  const bannerBtns: ReactNode[] = [
    <UIButton key="consult" onClick={() => showModal()}>
      立即咨询
    </UIButton>,
    <UIButton key="download" onClick={() => { window.location.hash = 'demo' }} type="hollow">
      Demo 下载
    </UIButton>
  ]

  return (
    <>
      <PageBanner
        title="直播特效 SDK"
        desc="直播特效 SDK，由七牛云 SDK 团队和字节跳动特效 SDK 团队联合打造。
        提供直播推流等基础功能的同时，也可快速集成上线美颜滤镜、大眼瘦脸、美妆美形等特效功能。更有上千款贴纸和滤镜资源可供挑选，火山、轻颜也在用。"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <Navigator />

      <Advantage />
      <ProductFeature />
      <Scene />
      <Demo />
      <LinkGroups title="相关文档">
        <LinkGroup title="Github 地址">
          <LinkItem href="https://github.com/pili-engineering/PLDroidMediaStreaming-ByteDance">Android Github 地址</LinkItem>
          <LinkItem href="https://github.com/pili-engineering/PLMediaStreamingKit-ByteDance">iOS Github 地址</LinkItem>
        </LinkGroup>
      </LinkGroups>
      <UsageGuide title="注册即可体验全方位直播特效 SDK">
        <UsageGuideButton onClick={showModal}>
          立即咨询
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
