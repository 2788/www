/**
 * @author: corol
 * @github: github.com/huangbinjie
 * @created: Mon May 11 2020
 * @file: 短视频 sdk
 *
 * Copyright (c) 2020 Qiniu
 */

import React from 'react'
import { useBtns } from 'hooks/product-btn'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import LinkGroups, { LinkGroup, LinkItem } from 'components/Product/LinkGroups'

import Feature from 'components/pages/plsv/Feature'
import PriceList from 'components/pages/plsv/PriceList'
import Demo from 'components/pages/plsv/Demo'
import Scene from 'components/pages/plsv/Scene'

import imgBanner from './images/banner.png'

export default function Page() {

  const btns = useBtns(
    { children: '免费体验', href: 'https://portal.qiniu.com/sdk/licenses?showDrawer&ref=www.qiniu.com', pcOnly: true },
    { children: '接入指南', href: 'https://developer.qiniu.com/pili/sdk/3955/short-video-quick-guide' }
  )

  return (
    <Layout>
      <PageBanner
        title="短视频 SDK"
        desc="短视频 SDK，由七牛音视频团队潜心研发。100+ 功能覆盖绝大部分视频拍摄和编辑场景，本地转码性能优异，更支持对接第三方视频滤镜、人脸贴纸、背景分割等高级功能，协助您打造一站式手机视频制作工具。"
        btns={btns.banner}
        icon={imgBanner} />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem href="/products/svesdk">
            短视频特效 SDK
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

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
      <UsageGuide title="注册即可体验全方位实时音视频">
        <UsageGuideButton href="https://portal.qiniu.com/sdk/licenses?showDrawer&ref=www.qiniu.com">
          免费体验
        </UsageGuideButton>
      </UsageGuide>
    </Layout>
  )
}
