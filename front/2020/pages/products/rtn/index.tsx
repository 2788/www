/**
 * @file 产品“RTC”
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import RtcScene from 'components/pages/rtc/Scene'
import RtcDemo from 'components/pages/rtc/Demo'
import AcceleratedNetwork from 'components/pages/rtc/AcceleratedNetwork'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'
import { useModal as useFeedbackModal } from 'components/Feedback'

import ServerSideMergeIcon from './_images/feature-serverside-merge.svg'
import RealtimeRecordIcon from './_images/feature-realtime-record.svg'
import PersonalManagementIcon from './_images/feature-personal-management.svg'
import RichMediaIcon from './_images/feature-richmedia.svg'
import SideWayIcon from './_images/feature-sideway.svg'
import YellowIdIcon from './_images/feature-yellow-identification.svg'

import imgBanner from './_images/banner.png'

import style from './index.less'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {

  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/rtn/rtc/report/duration', children: '免费使用', pcOnly: true },
    { onClick: handleConsult, children: '立即咨询' },
    { href: 'https://demo-rtc.qnsdk.com/', children: '在线体验' }
  )

  return (
    <>
      <PageBanner
        title="实时音视频"
        desc="七牛实时音视频云是基于七牛在直播产品上的积累，结合实时音视频 SDK 和 自研实时互动流媒体网络及强大云端能力，为客户提供跨平台、高品质、可定制化的一站式解决方案，零基础搭建音视频平台，快速支持一对一视频通话、多人会议、直播连麦、旁路直播等多种业务场景。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner} />

      <Navigator>
        {btns.nav}
      </Navigator>

      <AcceleratedNetwork />

      <Feature name="feature" title="特色功能">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<ServerSideMergeIcon />}
            title="服务端合流"
            className={style.feature}
          >
            <FeatureDesc>解决主流混流方案的上下行带宽瓶颈问题和编解码问题，降低计算资源和网络带宽成本</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<SideWayIcon />}
            title="旁路直播"
            className={style.feature}
          >
            <FeatureDesc>支持全球加速分发音视频，上行数据可转码成 RTMP、HTTP、HLS 协议，方便用户通过 Web 或流媒体播放器观看</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<RealtimeRecordIcon />}
            title="实时录制"
            className={style.feature}
          >
            <FeatureDesc>支持全球加速分发音视频，上行数据可转码成 RTMP、HTTP、HLS 协议，方便用户通过 Web 或流媒体播放器观看</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<PersonalManagementIcon />}
            title="个性化管理"
            className={style.feature}
          >
            <FeatureDesc>支持动态邀人、踢人、禁音等多种管理权限，使聊天互动更加有序</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<RichMediaIcon />}
            title="智能富媒体处理"
            className={style.feature}
          >
            <FeatureDesc>提供水印、音视频转码、切片和拼接等基础的数据处理服务及自定义数据处理服务，满足各类音视频互动场景</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<YellowIdIcon />}
            title="鉴黄鉴暴恐"
            className={style.feature}
          >
            <FeatureDesc>云端实现黄暴恐图自动鉴别，有效规避涉黄、涉暴恐、涉政风险，让平台更安全稳定地运营</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <RtcScene />

      <RtcDemo />

      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://doc.qnsdk.com/rtn/docs/rtn_overview">产品简介</LinkItem>
          <LinkItem href="https://doc.qnsdk.com/rtn/docs/feature_list">核心功能</LinkItem>
          <LinkItem href="https://doc.qnsdk.com/rtn/docs/rtn_startup">接入流程</LinkItem>
        </LinkGroup>
        <LinkGroup title="开发手册">
          <LinkItem href="https://doc.qnsdk.com/rtn/android">Android 开发手册</LinkItem>
          <LinkItem href="https://doc.qnsdk.com/rtn/ios">iOS 开发手册</LinkItem>
          <LinkItem href="https://doc.qnsdk.com/rtn/web">Web 开发手册</LinkItem>
          <LinkItem href="https://doc.qnsdk.com/rtn/windows">Windows 开发手册</LinkItem>
          <LinkItem href="https://doc.qnsdk.com/rtn/docs/server_overview">服务端开发手册</LinkItem>
        </LinkGroup>
        <LinkGroup title="其他">
          <LinkItem href="https://doc.qnsdk.com/rtn/docs/demo">Demo 体验及源码下载</LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function RtcPage() {
  return (
    <Layout title="实时音视频">
      <PageContent />
    </Layout>
  )
}
