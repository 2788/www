/**
 * @file 产品“对象存储”
 */

import React, { ReactNode } from 'react'
import Layout from '../../../components/Product/Layout'
import PageBanner from '../../../components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from '../../../components/Product/PageNotice'
import Navigator, { Button as NavButton, Block } from '../../../components/Product/Navigator'
import { useModal as useFeedbackModal } from '../../../components/Feedback'
import UsageGuide, { Button as UsageGuideButton } from '../../../components/Product/UsageGuide'

import UIButton from '../../../components/UI/Button'

// svg 方式引入
// import BannerIcon from './images/bannerIcon.svg'

// 非 svg 方式引入
import bannerIconURL from './images/bannerIcon.png'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const bannerBtns: ReactNode[] = [(
    <UIButton key="try" href="/products/fusion">
      免费试用
    </UIButton>
  ), (
    <UIButton key="consult" type="hollow" onClick={handleConsult}>
      售前咨询
    </UIButton>
  )]

  return (
    <>
      <PageBanner
        title="对象存储 Kodo"
        desc="七牛云海量存储系统（KODO）是自主研发的非结构化数据存储管理平台，支持中心和边缘存储。
        平台经过多年大规模用户验证已跻身先进技术行列，并广泛应用于海量数据管理的各类场景。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        // svg 方式引入
        // icon={<BannerIcon />}
        // 非 svg 方式引入
        icon={(<img width="600" src={bannerIconURL} title="对象存储-七牛云" alt="对象存储-七牛云" />)} />
      <PageNotice>
        <PageNoticeGroup title="新闻动态" type="news">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="/products/ssl">
            域名型 DV SSL 证书免费申请 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem title="CDN 动态加速 立即使用" href="/products/qcdn">
            「 CDN 动态加速 立即使用 」
          </PageNoticeItem>
          <PageNoticeItem title="体验边缘存储服务" href="/products/kodo">
            体验边缘存储服务
          </PageNoticeItem>
        </PageNoticeGroup>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="域名型 DV SSL 证书免费申请" href="/products/ssl">
            域名型 DV SSL 证书免费申请 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem title="CDN 动态加速 立即使用" href="/products/qcdn">
            「 CDN 动态加速 立即使用 」
          </PageNoticeItem>
          <PageNoticeItem title="体验边缘存储服务" href="/products/kodo">
            体验边缘存储服务
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>
      <Navigator priceLink="/TODO">
        <NavButton type="primary" href="/products/kodo">免费试用</NavButton>
        <NavButton withBorder onClick={handleConsult}>售前咨询</NavButton>
      </Navigator>
      This is Product Kodo Page.
      <FakeBlock name="spec" title="产品规格" />
      <FakeBlock name="feature" title="功能与优势" />
      <FakeBlock name="usage" title="使用场景" />
      <FakeBlock name="case" title="客户案例" />
      <FakeBlock name="steps" title="接入流程" />
      <FakeBlock name="docs" title="相关文档" />
      <UsageGuide
        title="开始试用七牛云 SMS"
        description="完成实名认证，即可轻松使用七牛云 SMS"
      >
        <UsageGuideButton href="/products/kodo/">
          立即创建
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function KodoPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}

// 可导航区块，如产品规格、功能优势、使用场景等
function FakeBlock({ name, title }: { name: string, title: string }) {
  return (
    <Block name={name} title={title}>
      <div style={{ height: '400px', marginBottom: '12px', background: '#f0f0f0' }}>
        {title}（TODO）
      </div>
    </Block>
  )
}
