/**
 * @file 解决方案”短视频“
 */

import React, { ReactNode } from 'react'

import UIButton from 'components/UI/Button'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator, { Button as NavButton } from 'components/Product/Navigator'
import PlsvAdvantage from 'components/pages/plsv-solution/Advantage'
import PlsvFeature from 'components/pages/plsv-solution/Feature'
import PlsvFunc from 'components/pages/plsv-solution/Func'
import PlsvSolution from 'components/pages/plsv-solution/Solution'
import PlsvClientLogo from 'components/pages/plsv-solution/ClientLogo'
import PlsvAccess from 'components/pages/plsv-solution/Access'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import BannerIcon from './images/banner-icon.svg'

function PageContent() {
  const bannerBtns:  ReactNode[] = [(
    <UIButton key="exp" href="https://portal.qiniu.com/sdk/licenses?showDrawer">
      0 元体验
    </UIButton>
  ), (
    <UIButton key="sdk" href="https://developer.qiniu.com/pili/sdk/3920/short-video-demo-download">
      短视频 SDK
    </UIButton>
  ), (
    <UIButton key="func" type="hollow" href="https://developer.qiniu.com/pili/sdk/3731/short-video">
      SDK 功能列表
    </UIButton>
  )]

  return (
    <>
      <PageBanner
        title="短视频解决方案"
        desc="七牛短视频解决方案（PLSV）是提供端到云的一站式的短视频解决方案，
        集视频拍摄、编辑、处理、上传、存储、分发加速、播放、内容分析审核、大数据分析等功能于一体。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <Navigator>
        <NavButton type="primary" href="https://portal.qiniu.com/sdk/licenses?showDrawer">
          0 元体验
        </NavButton>
        <NavButton type="primary" href="https://developer.qiniu.com/pili/sdk/3920/short-video-demo-download">
          短视频 SDK
        </NavButton>
        <NavButton withBorder href="https://developer.qiniu.com/pili/sdk/3731/short-video">
          SDK 功能列表
        </NavButton>
      </Navigator>

      <PlsvAdvantage />

      <PlsvFeature />

      <PlsvFunc />

      <PlsvSolution />

      <PlsvClientLogo />

      <PlsvAccess />

      <LinkGroups title="产品相关" header="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3919/a-short-video-the-white-paper">七牛短视频白皮书</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili//sdk/3921/the-server-api">服务端 API</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK 及工具">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3734/android-short-video-sdk">Android 采集端 SDK</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3733/short-video-ios-sdk">iOS 采集端 SDK</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/1210/the-android-client-sdk">Android 播放端 SDK</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/1211/ios-playback-end-the-sdk">iOS 播放端 SDK</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/4164/windows-player-sdk">Windows 播放端 SDK</LinkItem>
        </LinkGroup>
        <LinkGroup title="其他">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3920/short-video-demo-download">Demo 下载</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide
        title="注册即可免费试用短视频"
      >
        <UsageGuideButton
          href="https://portal.qiniu.com/sdk/licenses?showDrawer"
        >
          立即开通
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function PlsvPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
