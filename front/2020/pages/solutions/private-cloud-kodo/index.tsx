/**
 * @file 解决方案”私有云存储“
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import PrivateCloudKodoArch from 'components/pages/private-cloud-kodo/Arch'
import PrivateCloudKodoAdvantage from 'components/pages/private-cloud-kodo/Advantage'
import PrivateCloudKodoSpec from 'components/pages/private-cloud-kodo/Spec'
import PrivateCloudKodoScene from 'components/pages/private-cloud-kodo/Scene'
import PrivateCloudKodoCase from 'components/pages/private-cloud-kodo/Case'
import PrivateCloudKodoClientLogo from 'components/pages/private-cloud-kodo/ClientLogo'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useBtns } from 'hooks/product-btn'

import BannerIcon from './images/banner-icon.svg'

function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const btns = useBtns(
    { onClick: handleConsult, children: '咨询详情' },
    { href: 'https://developer.qiniu.com/kodoe/manual/5867/a-free-trial', children: '免费试用' }
  )

  const descView = (
    <>
      <p>七牛私有云存储 (Kodo Enterprise) 是基于七牛公有云对象存储服务的架构设计和运营经验完全自主研发的存储系统。</p>
      <p>能够为客户搭建数百 EB 级别的高可靠、强安全、低成本、可扩展的业务系统，满足多样的非结构化数据存储需求。</p>
    </>
  )

  return (
    <>
      <PageBanner
        title="私有云存储解决方案 Kodo Enterprise"
        desc={descView}
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={<BannerIcon />} />

      <Navigator>{btns.nav}</Navigator>

      <PrivateCloudKodoArch />

      <PrivateCloudKodoAdvantage />

      <PrivateCloudKodoSpec />

      <PrivateCloudKodoScene />

      <PrivateCloudKodoCase />

      <PrivateCloudKodoClientLogo />

      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="/solutions/private-cloud-kodo">私有云存储</LinkItem>
          <LinkItem href="/solutions/private-cloud-kodo">Android 端 Demo 体验</LinkItem>
        </LinkGroup>
        <LinkGroup title="相关产品">
          <LinkItem href="/solutions/private-cloud-kodo">对象存储</LinkItem>
          <LinkItem href="/solutions/private-cloud-kodo">智能多媒体服务</LinkItem>
          <LinkItem href="/solutions/private-cloud-kodo">数据分析平台</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide
        title="联系我们，了解更多详情"
      >
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function PrivateCloudKodoPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
