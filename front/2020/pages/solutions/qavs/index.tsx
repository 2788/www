/**
 * @file 解决方案”智能视频云“
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import QavsFeature from 'components/pages/qavs/Feature'
import QavsArch from 'components/pages/qavs/Arch'
import QavsScene from 'components/pages/qavs/Scene'

import { useBtns } from 'hooks/product-btn'

import imgBanner from './images/banner.png'

function PageContent() {
  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' },
    { href: 'https://dn-mars-assets.qbox.me/lsm7Yon7_XwirC_mGIQvRe1Fmkx3', children: '下载白皮书' }
  )

  return (
    <>
      <PageBanner
        title="智能视频云"
        desc="七牛智能视频云为企业提供智能、高效、一站式的视频解决方案，帮助企业节省 70% 系统自建成本，
        并集成海量存储、弹性计算、智能网络、直播、点播、实时音视频、播放器、视觉智能及数据智能为一体。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="音视频 SDK 下载" href="https://developer.qiniu.com/rtn/sdk/4330/download-the-sdk">
            音视频 SDK 下载
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator>{btns.nav}</Navigator>

      <QavsArch />

      <QavsFeature />

      <QavsScene />

      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/pili/manual/1209/live-the-core-function">
            直播云技术白皮书
          </LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/manual/1217/live-architecture-fleetly">
            直播架构快速搭建
          </LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3919/a-short-video-the-white-paper">
            七牛短视频白皮书
          </LinkItem>
          <LinkItem href="https://developer.qiniu.com/rtn/manual/4373/cloud-real-time-audio-and-video-interaction">
            实时音视频白皮书
          </LinkItem>
        </LinkGroup>
        <LinkGroup title="其他">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3920/short-video-demo-download">
            短视频 demo 体验
          </LinkItem>
          <LinkItem href="https://developer.qiniu.com/rtn/manual/4374/the-demo-experience">
            实时音视频 demo 体验
          </LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function QavsPage() {
  return (
    <Layout
      title="智能视频云"
      keywords="智能视频云, 智能视频, 视频云, 视频云服务, 视频云存储, 视频云平台"
      description="七牛智能视频云为企业提供智能、高效、一站式的视频解决方案，帮助企业节省 70% 系统自建成本，并集成海量存储、弹性计算、智能网络、直播、点播、实时音视频、播放器、视觉智能及数据智能为一体。"
    >
      <PageContent />
    </Layout>
  )
}
