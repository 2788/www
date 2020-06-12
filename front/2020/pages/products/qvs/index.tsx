/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Fri Jun 12 2020
 * @file: 短视频监控 QVS
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { useBtns } from 'hooks/product-btn'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import Feature from 'components/pages/qvs/Feature'
import Scene from 'components/pages/qvs/Scene'

import imgBanner from './images/banner.png'

export default function Page() {

  const btns = useBtns(
    { children: '申请开通', href: 'https://jinshuju.net/f/y9P9t9' },
    { children: '文档 & API', href: 'https://developer.qiniu.com/qvs/manual/6753/qvs-product-overview' }
  )

  return (
    <Layout
      title="视频监控 QVS"
      keywords="视频监控 QVS qvs"
      description="视频监控（QVS）是基于七牛云实时流网络和完善的视频处理技术，面向视频监控设备提供的音视频流接入、存储、分发、录制回放的服务。视频流接入云端后，可与七牛云智能多媒体服务等产品集成，快速构建智能视频监控服务。"
    >
      <PageBanner
        title="视频监控 QVS"
        desc="视频监控（QVS）是基于七牛云实时流网络和完善的视频处理技术，面向视频监控设备提供的音视频流接入、存储、分发、录制回放的服务。视频流接入云端后，可与七牛云智能多媒体服务等产品集成，快速构建智能视频监控服务。"
        btns={btns.banner}
        icon={imgBanner} />

      <Navigator>{btns.nav}</Navigator>

      <Feature />
      <Scene />
      <PriceList />
      <Demo />
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
        <UsageGuideButton href="https://portal.qiniu.com/sdk/licenses?showDrawer&ref=www.qiniu.com">
          免费体验
        </UsageGuideButton>
      </UsageGuide>
    </Layout>
  )
}
