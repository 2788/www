/**
 * @file 产品“对象存储”
 */

import React, { ReactNode } from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator, { Button as NavButton } from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import UIButton from 'components/UI/Button'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Link as FeatureLink
} from 'components/Product/Feature'
import Arch from 'components/pages/pili/Arch'
import PiliScene from 'components/pages/pili/Scene'

// 功能与优势 图片
import DelayIcon from './images/advantages-delay.svg'
import FaultToleranceIcon from './images/advantages-faulttolerance.svg'
import NetworkShrinkIcon from './images/advantages-networkshrink.svg'
import PackageLossIcon from './images/advantages-packageloss.svg'
import SmartLineIcon from './images/advantages-smartline.svg'
import WeakNetAdapterIcon from './images/advantages-weaknetadapter.svg'

import BannerIcon from './images/bannerIcon.svg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent() {
  const { showModal } = useFeedbackModal()

  function handleConsult() {
    showModal()
  }

  const bannerBtns: ReactNode[] = [(
    <UIButton key="try" href="/products/pili">
      立即使用
    </UIButton>
  ), (
    <UIButton key="consult" type="hollow" onClick={handleConsult}>
      立即咨询
    </UIButton>
  )]

  return (
    <>
      <PageBanner
        title="视频直播"
        desc="七牛直播云服务 (PILI) 是基于强大的全球化实时流网络、完善的客户端服务和云端服务，打造的端到端直播解决方案，提供低延迟、稳定流畅、高可用的一站式直播云服务。"
        bgColor="#34A1EC"
        btns={bannerBtns}
        icon={<BannerIcon />} />

      <Navigator priceLink="/TODO">
        <NavButton type="primary" href="/products/pili">立即使用</NavButton>
        <NavButton withBorder onClick={handleConsult}>立即咨询</NavButton>
      </Navigator>

      <Feature name="advantages" title="功能与优势">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<DelayIcon />}
            title="延迟"
          >
            <FeatureDesc>自适应直播场景优选调度线路，毫秒级延迟满足更好的直播体验</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<PackageLossIcon />}
            title="丢包"
          >
            <FeatureDesc>路由传输动态选择，支持QUIC等推流协议，优化弱网环境推流服务品质</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<WeakNetAdapterIcon />}
            title="弱网少卡顿"
          >
            <FeatureDesc>采用七牛优化后的 QUIC 传输协议，帮助用户减少复杂网络下的卡顿率，提高流畅度。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<NetworkShrinkIcon />}
            title="网络按需收缩"
          >
            <FeatureDesc>采用全新网络技术，实时计算全链路状态，按需智能伸缩较好路径节点。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<SmartLineIcon />}
            title="智能选线"
          >
            <FeatureDesc>采用软件定义网络的方式，动态制定线路组合，更新实时数据，决策调度优质线路。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<FaultToleranceIcon />}
            title="故障容错"
          >
            <FeatureDesc>全网对称部署服务节点，任一节点失效均可立即摘除，及时容错保障服务的高可用。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Arch />

      <PiliScene />

      <LinkGroups grey title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://www.qiniu.com">产品简介</LinkItem>
          <LinkItem href="https://www.qiniu.com">计费说明</LinkItem>
          <LinkItem href="https://www.qiniu.com">备案相关</LinkItem>
          <LinkItem href="https://www.qiniu.com">网络与安全性概述</LinkItem>
          <LinkItem href="https://www.qiniu.com">实例规模族</LinkItem>
          <LinkItem href="https://www.qiniu.com">磁盘管理</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://www.qiniu.com">为什么云主机连不上 Redis？</LinkItem>
          <LinkItem href="https://www.qiniu.com">如何为 Linux 服务器安装 GRUB？</LinkItem>
          <LinkItem href="https://www.qiniu.com">负载均衡常见问题</LinkItem>
          <LinkItem href="https://www.qiniu.com">后端服务器常见问题</LinkItem>
        </LinkGroup>
        <LinkGroup title="上云实践">
          <LinkItem href="https://www.qiniu.com">试用迁移工具迁移服务器至 QVM</LinkItem>
          <LinkItem href="https://www.qiniu.com">云主机与对象存储内网相互连接使用</LinkItem>
        </LinkGroup>
      </LinkGroups>

      <UsageGuide
        title="准备好了吗？"
        description="简单几步，即可创建您自己的直播产品"
      >
        <UsageGuideButton href="/products/pili/">
          立即创建
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function PiliPage() {
  return (
    <Layout>
      <PageContent />
    </Layout>
  )
}
