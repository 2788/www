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
// import AccessProcess, { Step } from 'components/Product/AccessProcess'
import CustomerCaseGroup, { CustomerCase } from 'components/Product/CustomerCaseGroup'
import PurchaseInfo, { PurchaseInfoItem, PurchaseInfoAction } from 'components/Product/PurchaseInfo'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Link as FeatureLink
} from 'components/Product/Feature'
import KodoScene from 'components/pages/kodo/Scene'

import ChangBa from './images/changba.png'
import PingAn from './images/pingan.png'
import ShunFeng from './images/shunfeng.png'
import YiDong from './images/yidong.png'

import BannerIcon from './images/bannerIcon.svg'
import AdvantIconFile from './images/advantIconFile.svg'
import AdvantIconChart from './images/advantIconChart.svg'

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

      {/* <AccessProcess>
        <Step icon={ChangBa}>第一步</Step>
        <Step icon={PingAn}>第二步</Step>
        <Step icon={YiDong}>第三步</Step>
        <Step icon={ChangBa}>第四步</Step>
      </AccessProcess> */}

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

      <Feature name="advantage" title="产品优势" grey>
        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            icon={<AdvantIconFile />}
            title="高可靠"
          >
            <FeatureDesc>业界领先的纠删码存储方案，能够提供高达 11 个 9 的数据可靠性。跨数据中心的副本冗余，能够保障服务的超高可用性。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            icon={<AdvantIconChart />}
            title="易扩展"
          >
            <FeatureDesc>利用七牛云对象存储，您的存储空间无上限的同时也无需担心扩容问题。您能够实现存储需求的弹性伸缩，从而提高业务灵活性。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            icon={<AdvantIconFile />}
            title="低成本"
          >
            <FeatureDesc>您无需前期投入。七牛云对象存储按需使用、按需付费的便捷性，能够有效避免存储及带宽资源的闲置浪费。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            icon={<AdvantIconChart />}
            title="数据智能化"
          >
            <FeatureDesc>与七牛云其他产品紧密协同，提供标准 HDFS 访问方式，为大数据和机器学习的海量高速读写场景进行了大量优化。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="left-right"
            icon={<AdvantIconFile />}
            title="存储加速"
          >
            <FeatureDesc>边缘存储可充分利用可用链路带宽，数据在边缘节点上传和下载可平均提速 60% 以上。</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="left-right"
            icon={<AdvantIconChart />}
            title="边缘计算"
          >
            <FeatureDesc>就近集成边缘计算及边缘缓存服务，边缘存储节点具备本地数据处理能力。</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Feature name="core" title="核心功能及服务">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconFile />}
            title="多媒体数据处理"
          >
            <FeatureDesc>基于对象存储，您可以一站式地完成图片处理和音视频处理。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconChart />}
            title="跨区域同步"
          >
            <FeatureDesc>跨区域同步让用户通过简单操作即可对不同存储区域的数据进行高效迁移和同步，实现数据异地容灾。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconFile />}
            title="生命周期管理"
          >
            <FeatureDesc>生命周期管理让用户可以根据业务需要，为存储空间制定规则，存储对象可自动化定时进行存储类型转化或删除操作。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconFile />}
            title="低频存储"
          >
            <FeatureDesc>低频存储提供了比标准存储更低的价格，适用于数据访问实时，读取频率较低的业务场景（如企业数据备份、监控数据、网盘应用等）。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconChart />}
            title="镜像存储"
          >
            <FeatureDesc>镜像存储适用于迁移原有业务系统的已有数据。可以帮助用户实现无缝数据迁移，迁移过程中并不影响原有业务系统的访问。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<AdvantIconFile />}
            title="上传／下载"
          >
            <FeatureDesc>针对不同的上传 / 下载场景，七牛云提供了丰富的 API 接口和工具供用户使用，同时支持服务端上传和客户端直传，并提供加速服务。</FeatureDesc>
            <FeatureLink href="/products/fusion">了解更多 &gt;&gt;</FeatureLink>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

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
