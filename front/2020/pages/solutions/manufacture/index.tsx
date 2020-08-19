/**
 * @file 智能制造
 */

import React from 'react'
import Layout from 'components/Product/Layout'
import PageBanner from 'components/Product/PageBanner'
import Navigator from 'components/Product/Navigator'
import { useBtns } from 'hooks/product-btn'
import { useModal } from 'components/Feedback'
import Section from 'components/Product/Section'
import Related, { ProductItem as RelatedProduct } from 'components/Solution/Related'
import { Product } from 'constants/products'
import UsageGuide, { Button as UsageGuideButton } from 'components/Product/UsageGuide'

import Value from 'components/pages/solutions/manufacture/Value'
import TypicalScene from 'components/pages/solutions/manufacture/Scene'
import Case from 'components/pages/solutions/manufacture/Case'

import banner from './banner.png'

function Page() {
  const { startConsulting } = useModal()
  const btns = useBtns(
    { children: '立即咨询', onClick: startConsulting }
  )

  return (
    <>
      <PageBanner
        title="智能制造"
        desc="凭借七牛在异构数据湖和数据分析与处理等领域的核心技术和独到理解，帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造，提升核心竞争力。"
        btns={btns.banner}
        icon={banner}
      />

      <Navigator>{btns.nav}</Navigator>

      <Value />

      <TypicalScene />

      <Case />

      <Section name="related" title="相关云产品" withTailPadding>
        <Related>
          <RelatedProduct name="机器数据智能" product={Product.Express} />
          <RelatedProduct name="存储与数据湖" product={Product.Kodo} />
          {/* TODO 改成 SDK 落地页 */}
          <RelatedProduct name="视觉数据智能" product={Product.Plsv} />
        </Related>
      </Section>

      <UsageGuide
        title="欢迎联系我们了解更多行业成功案例经验"
      >
        <UsageGuideButton onClick={startConsulting}>
          立即咨询
        </UsageGuideButton>
      </UsageGuide>
    </>
  )
}

export default function Main() {
  return (
    <Layout
      title="智能制造"
      keywords="智能制造, 智能, 制造"
      description="凭借七牛在异构数据湖和数据分析与处理等领域的核心技术和独到理解，帮助制造行业客户快速落地工业互联网，优选生态，数据驱动智能制造，提升核心竞争力。"
    >
      <Page />
    </Layout>
  )
}
