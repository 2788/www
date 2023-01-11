/**
 * @file 产品“pili”
 */

import React from 'react'
import { InferGetServerSidePropsType } from 'next'

import { urlForPrice } from 'utils/route'
import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import { headerThemeContext } from 'components/Header/Pc'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import { useBtns } from 'hooks/product-btn'
import { useApiWithParams } from 'hooks/api'
import { useMobile } from 'hooks/ua'
import LinkGroups, { LinkItem, LinkGroup } from 'components/Product/LinkGroups'
import Feature, {
  Group as FeatureGroup,
  Item as FeatureItem,
  Desc as FeatureDesc,
  Icon as FeatureIcon
} from 'components/Product/Feature'

import Function from 'components/pages/pili/Function'
import Arch from 'components/pages/pili/Arch'
import PiliScene from 'components/pages/pili/Scene'

import { getNews } from 'apis/admin/product'
import { getProductPageNotices } from 'apis/thallo'
import { getGlobalBanners } from 'apis/admin/global-banners'
import ProductNotice from 'components/Product/common/ProductNotice'
import ProductNews from 'components/Product/common/ProductNews'

// 功能与优势 图片
import delayIcon from './_images/advantages-delay.png'
import faultToleranceIcon from './_images/advantages-faulttolerance.png'
import networkShrinkIcon from './_images/advantages-networkshrink.png'
import packageLossIcon from './_images/advantages-packageloss.png'
import smartLineIcon from './_images/advantages-smartline.png'
import weakNetAdapterIcon from './_images/advantages-weaknetadapter.png'

import imgBannerPc from './_images/banner-pc.jpg'
import imgBannerMobile from './_images/banner-mobile.jpg'

// 内容放到单独的组件里，主要是为了让这里的内容可以接触到 feedback
// context（由 `<Layout>` 提供），使用 `useFeedbackModal`
type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function PageContent({ notices, newsRes }: Omit<Props, 'globalBanners'>) {
  const isMobile = useMobile()

  const { showModal: showWechatConsultModal } = useWechatConsultModal()

  const priceUrl = urlForPrice(Product.Pili)

  const btns = useBtns(
    { href: 'https://portal.qiniu.com/pili', children: '立即使用', pcOnly: true },
    { href: priceUrl, children: '产品价格', mobileOnly: true },
    { onClick: showWechatConsultModal, children: '立即咨询' }
  )

  const { $: currentNotices } = useApiWithParams(getProductPageNotices, {
    params: [Product.Pili]
  })

  return (
    <>
      <PageBanner
        title="视频直播"
        desc="七牛视频直播 (Pili) 是基于强大的全球化实时流网络、完善的客户端服务和云端服务，打造的端到端直播解决方案，提供低延迟、稳定流畅、高可用的一站式视频直播服务。"
        btns={btns.banner}
        bgImgUrl={isMobile ? imgBannerMobile : imgBannerPc}
      />

      <ProductNotice {...(currentNotices || notices)} />

      <Navigator priceLink={priceUrl}>
        {btns.nav}
      </Navigator>

      <Function />

      <Feature name="advantages" title="核心优势">
        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<FeatureIcon src={delayIcon} />}
            title="毫秒级延迟"
          >
            <FeatureDesc>自适应直播场景优选调度线路，毫秒级延迟满足更好的直播体验</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<FeatureIcon src={packageLossIcon} />}
            title="弱网抗丢包"
          >
            <FeatureDesc>路由传输动态选择，支持 SRT、QUIC 等推流协议，优化弱网环境推流服务品质</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<FeatureIcon src={weakNetAdapterIcon} />}
            title="弱网少卡顿"
          >
            <FeatureDesc>采用七牛优化后的 QUIC 传输协议，帮助用户减少复杂网络下的卡顿率，提高流畅度</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>

        <FeatureGroup>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<FeatureIcon src={networkShrinkIcon} />}
            title="网络按需收缩"
          >
            <FeatureDesc>采用全新网络技术，实时计算全链路状态，按需智能伸缩较好路径节点</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<FeatureIcon src={smartLineIcon} />}
            title="智能选线"
          >
            <FeatureDesc>采用软件定义网络的方式，动态制定线路组合，更新实时数据，决策调度优质线路</FeatureDesc>
          </FeatureItem>
          <FeatureItem
            pos="top-down"
            align="left"
            icon={<FeatureIcon src={faultToleranceIcon} />}
            title="故障容错"
          >
            <FeatureDesc>全网对称部署服务节点，任一节点失效均可立即摘除，及时容错保障服务的高可用</FeatureDesc>
          </FeatureItem>
        </FeatureGroup>
      </Feature>

      <Arch />

      <PiliScene />

      <ProductNews newsRes={newsRes} />

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

export default function PiliPage({ globalBanners, ...pageProps }: Props) {
  return (
    <headerThemeContext.Provider value="light">
      <Layout
        title="视频直播_直播推流_直播 SDK_直播云服务_视频直播 Pili"
        keywords="直播云, 云直播, 直播 SDK, 视频直播云服务, 视频直播服务, 直播 API, 推流 SDK, 播放 SDK, 视频直播, 七牛视频直播, quic 推流"
        description="七牛视频直播是专为直播平台打造的全球化直播流服务和端到端直播场景解决方案，提供 RTMP、HLS、HDL 直播支持、配套的数据处理服务、端到端 SDK 支持、APM 数据服务。"
        globalBanners={globalBanners}
      >
        <PageContent {...pageProps} />
      </Layout>
    </headerThemeContext.Provider>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      notices: await getProductPageNotices(Product.Pili),
      newsRes: await getNews({ product: Product.Pili }),
      globalBanners: await getGlobalBanners()
    }
  }
}
