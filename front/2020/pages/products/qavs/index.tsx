/**
 * @file 产品“对象存储”
 */

import React, { ReactNode } from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator, { Button as NavButton } from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import UIButton from 'components/UI/Button'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import QavsFeature from 'components/pages/qavs/Feature'
import QavsArch from 'components/pages/qavs/Arch'
import QavsScene from 'components/pages/qavs/Scene'

import BannerIcon from './images/bannerIcon.svg'

function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const bannerBtns: ReactNode[] = [(
    <UIButton key="consult" onClick={handleConsult}>
      立即咨询
    </UIButton>
  ), (
    <UIButton key="download" type="hollow" href="/products/qavs">
      下载白皮书
    </UIButton>
  )]

  return (
    <>
      <PageBanner
        title="智能视频云"
        desc="七牛智能视频云为企业提供智能、高效、一站式的视频解决方案，帮助企业节省 70% 系统自建成本，
        并集成海量存储、弹性计算、智能网络、直播、点播、实时音视频、播放器、视觉智能及数据智能为一体。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="音视频 SDK 下载" href="/products/qavs">
            音视频 SDK 下载
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator>
        <NavButton type="primary" onClick={handleConsult}>立即咨询</NavButton>
        <NavButton withBorder href="/products/qavs">下载白皮书</NavButton>
      </Navigator>

      <QavsArch />

      <QavsFeature />

      <QavsScene />

      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="/products/qavs">直播云技术白皮书</LinkItem>
          <LinkItem href="/products/qavs">直播架构快速搭建</LinkItem>
          <LinkItem href="/products/qavs">七牛短视频白皮书</LinkItem>
          <LinkItem href="/products/qavs">实时音视频白皮书</LinkItem>
        </LinkGroup>
        <LinkGroup title="其他">
          <LinkItem href="/products/qavs">短视频 demo 体验</LinkItem>
          <LinkItem href="/products/qavs">实时音视频 demo 体验</LinkItem>
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
