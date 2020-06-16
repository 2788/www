/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 直播特效 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { useBtns } from 'hooks/product-btn'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useModal } from 'components/Feedback'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import Advantage from 'components/pages/plesdk/Advantage'
import ProductFeature from 'components/pages/plesdk/Feature'
import Demo from 'components/pages/plesdk/Demo'
import Scene from 'components/pages/plesdk/Scene'

import banner from './images/banner.png'

export function Content() {
  const { startConsulting } = useModal()

  const btns = useBtns(
    { children: '立即咨询', onClick: startConsulting },
    { children: 'Demo 下载', href: '#demo' }
  )

  return (
    <>
      <PageBanner
        title="直播特效 SDK"
        desc="直播特效 SDK，由七牛云 SDK 团队和字节跳动特效 SDK 团队联合打造。
        提供直播推流等基础功能的同时，也可快速集成上线美颜滤镜、大眼瘦脸、美妆美形等特效功能。更有上千款贴纸和滤镜资源可供挑选，火山、轻颜也在用。"
        btns={btns.banner}
        icon={banner} />

      <Navigator>
        {btns.nav}
      </Navigator>

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
        <UsageGuideButton onClick={startConsulting}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Page() {
  return (
    <Layout
      title="直播特效 SDK"
      keywords="直播sdk, 直播特效 sdk, 特效 sdk, 特效, 美颜"
      description="直播特效 SDK，由七牛云 SDK 团队和字节跳动特效 SDK 团队联合打造。提供直播推流等基础功能的同时，也可快速集成上线美颜滤镜、大眼瘦脸、美妆美形等特效功能。更有上千款贴纸和滤镜资源可供挑选，火山、轻颜也在用。"
    >
      <Content />
    </Layout>
  )
}
