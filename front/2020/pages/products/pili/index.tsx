/**
 * @file 产品“pili”
 */

import React from 'react'
import { InferGetStaticPropsType } from 'next'

import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc
} from 'components/Product/Feature'

import Function from 'components/pages/pili/Function'
import Arch from 'components/pages/pili/Arch'
import PiliScene from 'components/pages/pili/Scene'

import { getNotices, INotice } from 'apis/admin/notice'
import ProducNotice from 'components/Product/common/ProducNotice'

// 功能与优势 图片
import DelayIcon from './_images/advantages-delay.svg'
import FaultToleranceIcon from './_images/advantages-faulttolerance.svg'
import NetworkShrinkIcon from './_images/advantages-networkshrink.svg'
import PackageLossIcon from './_images/advantages-packageloss.svg'
import SmartLineIcon from './_images/advantages-smartline.svg'
import WeakNetAdapterIcon from './_images/advantages-weaknetadapter.svg'

import imgBanner from './_images/banner.png'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
function PageContent({ notices }: { notices: INotice[] }) {
  const { startConsulting } = useFeedbackModal()

  const priceUrl = urlForPrice(Product.Pili)

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/apply-pili', children: '立即使用', pcOnly: true },
    { href: priceUrl, children: '产品价格', mobileOnly: true },
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="视频直播"
        desc="七牛视频直播 (Pili) 是基于强大的全球化实时流网络、完善的客户端服务和云端服务，打造的端到端直播解决方案，提供低延迟、稳定流畅、高可用的一站式视频直播服务。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner} />

      <ProducNotice notices={notices} />

      <Navigator priceLink={priceUrl}>
        {btns.nav}
      </Navigator>

      <Function />

      <Feature name="advantages" title="核心优势">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<DelayIcon />}
            title="毫秒级延迟"
          >
            <FeatureDesc>自适应直播场景优选调度线路，毫秒级延迟满足更好的直播体验</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<PackageLossIcon />}
            title="弱网抗丢包"
          >
            <FeatureDesc>路由传输动态选择，支持 QUIC 等推流协议，优化弱网环境推流服务品质</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<WeakNetAdapterIcon />}
            title="弱网少卡顿"
          >
            <FeatureDesc>采用七牛优化后的 QUIC 传输协议，帮助用户减少复杂网络下的卡顿率，提高流畅度</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<NetworkShrinkIcon />}
            title="网络按需收缩"
          >
            <FeatureDesc>采用全新网络技术，实时计算全链路状态，按需智能伸缩较好路径节点</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<SmartLineIcon />}
            title="智能选线"
          >
            <FeatureDesc>采用软件定义网络的方式，动态制定线路组合，更新实时数据，决策调度优质线路</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<FaultToleranceIcon />}
            title="故障容错"
          >
            <FeatureDesc>全网对称部署服务节点，任一节点失效均可立即摘除，及时容错保障服务的高可用</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Arch />

      <PiliScene />

      <LinkGroups title="相关文档">
        <LinkGroup title="常用文档">
          <LinkItem href="https://developer.qiniu.com/pili/manual/3694/pili-product-introduction">产品简介</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/manual/1217/live-architecture-fleetly">直播架构快速搭建</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/manual/1209/live-the-core-function">七牛直播云技术白皮书</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/manual/4211/small-program-live-access-to-documents">小程序直播接入文档</LinkItem>
        </LinkGroup>
        <LinkGroup title="SDK 及工具">
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3715/PLDroidMediaStreaming-overview">Android 推流端 SDK</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/3778/PLMediaStreamingKit-overview">iOS 推流端 SDK</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/sdk/1220/server-sdk">服务端 SDK</LinkItem>
        </LinkGroup>
        <LinkGroup title="常见问题">
          <LinkItem href="https://developer.qiniu.com/pili/kb/3646/ios-android-collapse-information-gathering-methods">iOS/Android 崩溃信息搜集方法</LinkItem>
          <LinkItem href="https://developer.qiniu.com/pili/kb/3876/a-live-cover-is-permanent">直播封面落是否永久保存</LinkItem>
        </LinkGroup>
      </LinkGroups>
    </>
  )
}

export default function PiliPage({ notices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="视频直播 Pili"
      keywords="直播云, 云直播, 直播 SDK, 视频直播云服务, 视频直播服务, 直播 API, 推流 SDK, 播放 SDK, 视频直播, 七牛视频直播, quic 推流"
      description="七牛视频直播是专为直播平台打造的全球化直播流服务和端到端直播场景解决方案，提供 RTMP、HLS、HDL 直播支持、配套的数据处理服务、端到端 SDK 支持、APM 数据服务。"
    >
      <PageContent notices={notices} />
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      notices: await getNotices(Product.Pili)
    }
  }
}
