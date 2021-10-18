/**
 * @file 互动直播解决方案
 */

import React from 'react'

import { Product } from 'constants/products'
import { Solution, nameMap } from 'constants/solutions'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'

import Architecture from 'components/pages/rtclive/Architecture'
import Scene from 'components/pages/rtclive/Scene'
import Advantage from 'components/pages/rtclive/Advantage'
import Demo from 'components/pages/rtclive/Demo'

import banner from './banner.png'

const title = `${nameMap[Solution.Rtclive]}解决方案`

function Page() {

  const { startIntentConsulting } = useFeedbackModal()
  const handleConsult = () => startIntentConsulting(title)

  const btns = useBtns(
    { onClick: handleConsult, children: '立即咨询' },
    { href: 'https://developer.qiniu.com/rtc', children: '查看文档' },
    { href: '#demo', children: '下载 Demo' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="一个 SDK 解决客户端直播推流及连麦互动，提供商用级开源 UI 辅助快速上线，支持美颜滤镜功能快速接入。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Architecture />

      <Scene />

      <Advantage />

      <Demo />

      <Section name="related" title="相关产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Rtn} />
          <RelatedProduct product={Product.Pili} />
          <RelatedProduct product={Product.Plesdk} />
        </Related>
        <Related>
          <RelatedProduct product={Product.Cdn} />
          <RelatedProduct product={Product.Kodo} />
          <RelatedProduct product={Product.Dora} />
        </Related>
      </Section>

      <UsageGuide title="联系我们，了解更多详情">
        <UsageGuideButton onClick={handleConsult}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function RtcLivePage() {
  return (
    <Layout
      title={title}
      keywords="互动直播, SDK, 直播推流, 连麦互动, 商用级开源, 美颜, 美颜滤镜, 连麦 PK, 视频交友, 语音聊天, 一站式方案, 美颜美妆, 双模式, 高性能网络, 快速接入, 全链路监控"
      description="一个 SDK 解决客户端直播推流及连麦互动，提供商用级开源 UI 辅助快速上线，支持美颜滤镜功能快速接入。"
    >
      <Page />
    </Layout>
  )
}
