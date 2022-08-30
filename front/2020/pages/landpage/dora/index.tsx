import React, { createElement } from 'react'
import { InferGetServerSidePropsType } from 'next'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import { useBtns } from 'hooks/product-btn'
import { useWechatConsultModal } from 'components/WechatConsultModal'
import PageNotice, {
  Group as PageNoticeGroup,
  Item as PageNoticeItem
} from 'components/Product/PageNotice'
import Navigator from 'components/Product/Navigator'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Section from 'components/Product/Section'
import Related, { Item as RelatedItem, ProductItem as RelatedProduct } from 'components/Solution/Related'
import { Product } from 'constants/products'
import { Landpage as Land, nameMap, urlMap, descMap, smallIconMap as iconMap } from 'constants/landpage'
import { getGlobalBanners } from 'apis/admin/global-banners'
import Arch from 'components/pages/landpage/dora/Architecture'
import CoreProduct from 'components/pages/landpage/dora/Core'
import TypicalScene from 'components/pages/landpage/dora/Scene'
import Case from 'components/pages/landpage/dora/Case'

import bannerImg from './_images/banner.png'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

function Main() {
  const { showModal: showWechatConsultModal } = useWechatConsultModal()
  const btns = useBtns(
    { onClick: showWechatConsultModal, children: '立即咨询' }
  )
  return (
    <>
      <PageBanner
        title="视觉数据分析平台"
        desc="零运维、高可用、高性能的视觉数据分析平台。提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习算法，提供多媒体数据的智能内容审核，智能识别，智能标签等高级功能，服务企业和开发者连接数据，重塑价值。"
        btns={btns.banner}
        icon={bannerImg}
      />

      <PageNotice>
        <PageNoticeGroup title="福利活动" type="welfares">
          <PageNoticeItem href="https://qmall.qiniu.com/template/NjQ">
            转码时长包，优惠来袭。立即选购 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem href="https://qmall.qiniu.com/template/NTg">
            内容审核，新用户可享 24 万次免费额度，更有超值套餐包可供选择 &gt;&gt;
          </PageNoticeItem>
          <PageNoticeItem href="https://marketing.qiniu.com/activity/activity-faceid">
            人脸核验，爆款服务，限时特惠 &gt;&gt;
          </PageNoticeItem>
        </PageNoticeGroup>
      </PageNotice>

      <Navigator>{btns.nav}</Navigator>

      <Arch />
      <CoreProduct />
      <TypicalScene onConsult={showWechatConsultModal} />
      <Case />
      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct name="存储与数据湖" product={Product.Kodo} />
          <RelatedItem icon={createElement(iconMap[Land.Sdk])} href={urlMap[Land.Sdk]} desc={descMap[Land.Sdk]}>
            {nameMap[Land.Sdk]}
          </RelatedItem>
          <RelatedProduct name="视觉数据智能" product={Product.Plsv} />
        </Related>
      </Section>

      <UsageGuide
        title="欢迎联系我们了解更多行业成功案例经验"
      >
        <UsageGuideButton onClick={showWechatConsultModal}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Page({ globalBanners }: Props) {
  return (
    <Layout
      title="视觉数据分析平台"
      keywords="七牛云, 视觉数据分析平台, 智能多媒体服务, 内容审核, 人脸核验"
      description="零运维、高可用、高性能的视觉数据分析平台。提供图片处理、音视频转码、水印、截图、瘦身等基础功能，并基于海量数据深度学习算法，提供多媒体数据的智能内容审核，智能识别，智能标签等高级功能，服务企业和开发者连接数据，重塑价值。"
      globalBanners={globalBanners}
    >
      <Main />
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      globalBanners: await getGlobalBanners()
    }
  }
}
