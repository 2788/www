/**
 * @file 电商行业解决方案
 */

import React from 'react'

import { Product } from 'constants/products'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import { useModal as useFeedbackModal } from 'components/Feedback'
import { useBtns } from 'hooks/product-btn'

import Scene from 'components/pages/ecommerce/Scene'
import Architecture from 'components/pages/ecommerce/Architecture'
import EcProduct from 'components/pages/ecommerce/Product'
import Cases from 'components/pages/ecommerce/Cases'

import banner from './banner.png'

function Page() {

  const { startConsulting } = useFeedbackModal()

  const btns = useBtns(
    { onClick: startConsulting, children: '立即咨询' }
  )

  return (
    <>
      <PageBanner
        title="电商行业解决方案"
        desc="为各种规模的电商企业提供灵活、安全、稳定、低成本的方案，深入结合直播、视频等新型运营方式，灵活构建面向业务的电解决方案，帮助企业从容应对业务高峰，以数字化运营掌控市场趋势。"
        bgColor="#34A1EC"
        btns={btns.banner}
        icon={banner} />

      <Navigator>{btns.nav}</Navigator>

      <Scene />

      <Architecture />

      <EcProduct />

      <Cases />

      <Section name="related" title="相关产品" header="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct product={Product.Cdn} />
          <RelatedProduct product={Product.Pili} />
          <RelatedProduct product={Product.Plms} />
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

export default function EcommercePage() {
  return (
    <Layout
      title="电商行业解决方案"
      keywords="电商, 灵活, 安全, 稳定, 低成本, 直播, 视频, 直播卖货, 超低延时, 灵活构建, 数字化运营, 七牛直播云, 实时监控, 预测业务运营, 数据驱动, 商业智能"
      description="为各种规模的电商企业提供灵活、安全、稳定、低成本的方案，深入结合直播、视频等新型运营方式，灵活构建面向业务的电解决方案，帮助企业从容应对业务高峰，以数字化运营掌控市场趋势。"
    >
      <Page />
    </Layout>
  )
}
