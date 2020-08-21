/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Fri Jun 12 2020
 * @file: 短视频监控 QVS
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { useMobile } from 'hooks/ua'
import { useBtns } from 'hooks/product-btn'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import Advantage from 'components/pages/qvs/Advantage'
import Core from 'components/pages/qvs/Core'
import Scene from 'components/pages/qvs/Scene'
import Process from 'components/pages/qvs/Process'

import imgBanner from './images/banner.png'

export function Page() {
  const portalUrl = 'https://portal.qiniu.com/qvs'

  const btns = useBtns(
    { children: '立即使用', href: portalUrl, pcOnly: true },
    { children: '文档 & API', href: 'https://developer.qiniu.com/qvs/manual/6753/qvs-product-overview' }
  )

  const isMobile = useMobile()

  return (
    <>
      <PageBanner
        title="视频监控 QVS"
        desc="视频监控（QVS）是基于七牛云实时流网络和完善的视频处理技术，面向视频监控设备提供的音视频流接入、存储、分发、录制回放的服务。视频流接入云端后，可与七牛云智能多媒体服务等产品集成，快速构建智能视频监控服务。"
        btns={btns.banner}
        icon={imgBanner} />

      <Navigator>{btns.nav}</Navigator>

      <Advantage />
      <Core />
      <Scene />
      <Process />
      <LinkGroups title="相关文档">
        <LinkGroup title="使用文档">
          <LinkItem href="https://developer.qiniu.com/qvs/manual/6753/qvs-product-overview">产品简介</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvs/manual/6763/qvs-quick-start">快速入门</LinkItem>
          <LinkItem href="https://developer.qiniu.com/qvs/api/6706/summary-of-the-api">API 文档</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK">
          <LinkItem href="https://github.com/qiniu/java-sdk/tree/master/src/main/java/com/qiniu/qvs">服务端 Java-SDK</LinkItem>
          <LinkItem href="https://github.com/qiniu/api.v7/tree/master/qvs">服务端 Go-SDK</LinkItem>
        </LinkGroup>
      </LinkGroups>

      {!isMobile && (
        <UsageGuide title="准备好了吗？简单几步完成监控视频上云">
          <UsageGuideButton href={portalUrl}>
            立即使用
          </UsageGuideButton>
        </UsageGuide>
      )}
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="视频监控 QVS"
      keywords="视频监控, QVS, qvs"
      description="视频监控（QVS）是基于七牛云实时流网络和完善的视频处理技术，面向视频监控设备提供的音视频流接入、存储、分发、录制回放的服务。视频流接入云端后，可与七牛云智能多媒体服务等产品集成，快速构建智能视频监控服务。"
    >
      <Page />
    </Layout>
  )
}
