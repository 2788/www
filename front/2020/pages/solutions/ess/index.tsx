/**
 * @file 解决方案”监控视频边缘存储“
 */

import React from 'react'

import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section'
import { useModal as useFeedbackModal } from 'components/Feedback'
import EssArch from 'components/pages/ess/Arch'
import EssIndustry from 'components/pages/ess/Industry'
import EssUnique from 'components/pages/ess/Unique'
import EssAdvantage from 'components/pages/ess/Advantage'
import EssScene from 'components/pages/ess/Scene'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'

import { Product } from 'constants/products'
import { useBtns } from 'hooks/product-btn'

import imgBanner from './images/banner.png'

function PageContent() {
  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '咨询详情' }
  )

  return (
    <>
      <PageBanner
        title="监控视频边缘存储解决方案"
        desc="面向视频监控行业，在七牛云边缘节点和用户侧部署边缘存储服务，加速视频数据边缘上传，
        自动同步边缘中心数据，有效解决上传链路差，带宽利用率低等行业痛点，降低本地存储成本。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={imgBanner}
      />

      <Navigator>{btns.nav}</Navigator>

      <EssArch />

      <EssIndustry />

      <EssUnique />

      <EssAdvantage />

      <EssScene />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Kodo} />
          <RelatedProduct product={Product.Qvs} />
          <RelatedProduct product={Product.Dora} />
          <RelatedProduct product={Product.Cdn} />
        </Related>
      </Section>

      <UsageGuide title="欢迎联系我们了解更多行业成功案例经验">
        <UsageGuideButton onClick={startConsulting}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function EssPage() {
  return (
    <Layout
      title="监控视频边缘存储解决方案"
      keywords="边缘存储, 边缘计算, 七牛云, 视频监控, 物联网"
      description="面向视频监控行业，在七牛云边缘节点和用户侧部署边缘存储服务，加速视频数据边缘上传，自动同步边缘中心数据，有效解决上传链路差，带宽利用率低等行业痛点，降低本地存储成本。"
    >
      <PageContent />
    </Layout>
  )
}
