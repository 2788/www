/**
 * @file 解决方案”视频云 SDK“
 */
import React from 'react'
import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import Section from 'components/Product/Section'
import PageBanner from 'components/Product/PageBanner'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import { useModal as useFeedbackModal } from 'components/Feedback'
import Feature from 'components/pages/landpage/sdk/Feature'
import { useBtns } from 'hooks/product-btn'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import imgBanner from './images/banner.png'

function PageContent() {
  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="视频云 SDK"
        desc="由七牛音视频团队多年精心打磨，提供丰富多样的 SDK，帮助用户聚焦业务本身，快速构建短视频、直播推流、实时音视频等核心能力，并且生态开放，优选业内领先厂商深度合作，技术融合，最新最热特效无时差上线，为用户带来简单、开放、一站式的极致体验。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem title="短视频特效 SDK，深度融合字节跳动特效 SDK，多快好省地打造专业级短视频制作工具 >>" href="../products/svesdk">
            短视频特效 SDK，深度融合字节跳动特效 SDK，多快好省地打造专业级短视频制作工具 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem title="直播特效 SDK，助你快速搞定美颜滤镜，塑造最美直播 >>" href="../products/plesdk">
            直播特效 SDK，助你快速搞定美颜滤镜，塑造最美直播 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem title="零基础搭建音视频平台，开通 QRTC 获取每月 15000 分钟免费时长 >>" href="../products/rtn">
            零基础搭建音视频平台，开通 QRTC 获取每月 15000 分钟免费时长 &gt;&gt;
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator>{btns.nav}</Navigator>

      <Feature />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding grey>
        <Related>
          <RelatedProduct name="机器数据智能" product={Product.Express} />
          <RelatedProduct name="异构数据湖" product={Product.Kodo} />
          <RelatedProduct name="视觉数据智能" product={Product.Dora} />
        </Related>
      </Section>

    </>
  )
}

export default function SdkPage() {
  return (
    <Layout
      title="视频云 SDK"
      keywords="视频云, SDK, 短视频, 连麦, 直播推流, 直播, 视频特效, 实时音视频, 生态, 一站式"
      description="由七牛音视频团队多年精心打磨，提供丰富多样的 SDK，帮助用户聚焦业务本身，快速构建短视频、直播推流、实时音视频等核心能力，并且生态开放，优选业内领先厂商深度合作，技术融合，最新最热特效无时差上线，为用户带来简单、开放、一站式的极致体验。"
    >
      <PageContent />
    </Layout>
  )
}