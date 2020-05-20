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

import BannerIcon from './images/banner-icon.svg'

function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const btns = useBtns(
    { onClick: handleConsult, children: '立即咨询' },
    { href: '/solutions/qavs', children: '下载白皮书' }
  )

  return (
    <>
      <PageBanner
        title="智能视频云"
        desc="七牛智能视频云为企业提供智能、高效、一站式的视频解决方案，帮助企业节省 70% 系统自建成本，
        并集成海量存储、弹性计算、智能网络、直播、点播、实时音视频、播放器、视觉智能及数据智能为一体。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="音视频 SDK 下载" href="/solutions/qavs">
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
          <LinkItem href="/solutions/qavs">直播云技术白皮书</LinkItem>
          <LinkItem href="/solutions/qavs">直播架构快速搭建</LinkItem>
          <LinkItem href="/solutions/qavs">七牛短视频白皮书</LinkItem>
          <LinkItem href="/solutions/qavs">实时音视频白皮书</LinkItem>
        </LinkGroup>
        <LinkGroup title="其他">
          <LinkItem href="/solutions/qavs">短视频 demo 体验</LinkItem>
          <LinkItem href="/solutions/qavs">实时音视频 demo 体验</LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function QavsPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}