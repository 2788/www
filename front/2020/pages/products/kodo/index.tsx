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
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import UIButton from 'components/UI/Button'
import StorageType from 'components/pages/kodo/StorageType'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import AccessProcess, { Step } from 'components/Product/AccessProcess'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import PurchaseInfo, { PurchaseInfoItem, PurchaseInfoAction } from 'components/Product/PurchaseInfo'
import KodoAdvantage from 'components/pages/kodo/Advantage'
import KodoCore from 'components/pages/kodo/Core'
import KodoScene from 'components/pages/kodo/Scene'

import ChangBa from './images/changba.png'
import PingAn from './images/pingan.png'
import ShunFeng from './images/shunfeng.png'
import YiDong from './images/yidong.png'

import BannerIcon from './images/bannerIcon.svg'

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
        icon={<BannerIcon />} />

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

      <StorageType />

      <LinkGroups>
        <LinkGroup title="文档链接1">
          <LinkItem href="https://www.qiniu.com">官网1</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网2</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网3</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网4</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网5</LinkItem>
        </LinkGroup>
        <LinkGroup title="文档链接2">
          <LinkItem href="https://www.qiniu.com">官网1</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网2</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网3</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网4</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网5</LinkItem>
        </LinkGroup>
        <LinkGroup title="文档链接3">
          <LinkItem href="https://www.qiniu.com">官网1</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网2</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网3</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网4</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网5</LinkItem>
        </LinkGroup>
        <LinkGroup title="文档链接4">
          <LinkItem href="https://www.qiniu.com">官网1</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网2</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网3</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网4</LinkItem>
          <LinkItem href="https://www.qiniu.com">官网5</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <AccessProcess
        subHeader={<a>bbbbb</a>}
      >
        <Step icon={ChangBa} url="https://baidu.com">aa</Step>
        <Step icon={ChangBa}>bb</Step>
        <Step icon={ChangBa} url="https://baidu.com">ccccccfosdhfoadfhdsaohdishafkjdshfkjdsahfkjalsdhflssdhflsafdhl</Step>
        <Step icon={ChangBa} url="https://baidu.com">dd</Step>
      </AccessProcess>

      <CustomerCaseGroup>
        <CustomerCase pic={ChangBa} />
        <CustomerCase pic={PingAn} />
        <CustomerCase pic={YiDong} />
        <CustomerCase pic={ShunFeng} />
        <CustomerCase pic={PingAn} />
        <CustomerCase pic={YiDong} />
      </CustomerCaseGroup>

      <PurchaseInfo>
        <PurchaseInfoItem title="CDN 产品价格" desc="CDN 产品价格CDN 产品价格">
          <PurchaseInfoAction url="https://www.qiniu.com">查看价格</PurchaseInfoAction>
        </PurchaseInfoItem>
        <PurchaseInfoItem title="CDN 资源包" desc="CDN 资源包CDN 资源包CDN 资源包">
          <PurchaseInfoAction url="https://www.qiniu.com">查看价格</PurchaseInfoAction>
        </PurchaseInfoItem>
        <PurchaseInfoItem title="CDN 资源包1" desc="CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1">
          <PurchaseInfoAction url="https://www.qiniu.com">查看价格</PurchaseInfoAction>
        </PurchaseInfoItem>
        <PurchaseInfoItem title="CDN 资源包2" desc="CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1CDN 资源包1">
          <PurchaseInfoAction url="https://www.qiniu.com">查看价格</PurchaseInfoAction>
        </PurchaseInfoItem>
      </PurchaseInfo>

      <KodoAdvantage />

      <KodoCore />

      <KodoScene />

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
// function FakeBlock({ name, title }: { name: string, title: string }) {
//   return (
//     <Block name={name} title={title}>
//       <div style={{ height: '400px', marginBottom: '12px', background: '#f0f0f0' }}>
//         {title}（TODO）
//       </div>
//     </Block>
//   )
// }
