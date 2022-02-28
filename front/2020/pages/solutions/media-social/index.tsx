/**
 * @file    社交娱乐解决方案
 * @author  renpanpan
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

import Architecture from 'components/pages/media-social/Architecture'
import Scene from 'components/pages/media-social/Scene'
import Advantage from 'components/pages/media-social/Advantage'
import Demo from 'components/pages/media-social/Demo'

import banner from './banner.png'

const title = `${nameMap[Solution.MediaSocial]}解决方案`

function Page() {

  const { startIntentConsulting } = useFeedbackModal()
  const handleConsult = () => startIntentConsulting(title)

  const btns = useBtns(
    { onClick: handleConsult, children: '立即咨询' },
    { href: 'https://portal.qiniu.com/rtn/app', children: '开始使用' },
    { href: '#demo', children: 'DEMO 体验' }
  )

  return (
    <>
      <PageBanner
        title={title}
        desc="社交连麦及超大房间互动直播，提供商用级开源 UI 辅助快速上线，支持美颜特效功能快速接入。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <Architecture />

      <Advantage />

      <Demo />

      <Section name="related" title="相关产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Rtn} />
          <RelatedProduct product={Product.Pili} />
          <RelatedProduct product={Product.Beautysdk} />
          <RelatedProduct product={Product.Dora} />
        </Related>
        <Related>
          <RelatedProduct product={Product.Censor} />
          <RelatedProduct product={Product.Avsmart} />
          <RelatedProduct product={Product.Cdn} />
          <RelatedProduct product={Product.Kodo} />
        </Related>
      </Section>

      <UsageGuide title="实时音视频 QRTC，每月尽享 20000 分钟免费时长">
        <UsageGuideButton href="https://portal.qiniu.com/rtn/app">
          开始使用
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function MediaSocialPage() {
  return (
    <Layout
      title={title}
      keywords="社交连麦, 互动直播, 超大房间互动直播, 商用级开源, 美颜, 美颜特效, 连麦 PK, 视频交友, 语聊房, FM 电台, 在线 KTV, 一起看视频, 一站式方案, 双模式可用, 快速接入, 美颜美妆, 高性能网络, 全链路监控"
      description="社交连麦及超大房间互动直播，提供商用级开源 UI 辅助快速上线，支持美颜特效功能快速接入。"
    >
      <Page />
    </Layout>
  )
}
